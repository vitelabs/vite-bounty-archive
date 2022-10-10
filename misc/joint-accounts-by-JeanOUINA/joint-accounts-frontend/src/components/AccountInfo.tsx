import { useCallback, useEffect, useState } from 'react';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { State } from '../utils/types';
import MemberCard from './MemberCard';
import MemberInputCard from './MemberInputCard';
import { getAccountsByIds, getMembers, JointAccount } from '../utils/jointAccount';
import * as vite from '@vite/vitejs'
import Switch from './Switch';
import TextInput from './TextInput';
import Balances from './Balances';
import Modal from './Modal';
import MotionConfirm from './MotionConfirm';
import { CANCELED } from '../utils/constants';
import { getLogsByAccountBlock, waitResponse } from '../utils/viteScripts';
import { useAccountDisplaySettings, useRefresh } from '../utils/hooks';
import ModifyThreshold from './ModifyThreshold';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Loading from './Loading';

type Props = State & {};

const AccountInfo = ({ i18n, viteApi, vcInstance, networkType, accountId, setState, callContract }: Props) => {
	const [account, setAccount] = useState<'loading'|JointAccount>('loading');
	const [members, setMembers] = useState<'loading'|string[]>('loading');
    const [openModal, setOpenModal] = useState<'add-member'|'remove-member'|'change-threshold'|''>('')
    const [openModalData, setOpenModalData] = useState('')
    const [accountDataRefreshId, refreshAccountData] = useRefresh()
    const [displaySettings, setDisplaySettings] = useAccountDisplaySettings({
        id: accountId
    } as JointAccount)

	useEffect(() => {
		let cancel = false;

		(async () => {
			setAccount('loading')
            setMembers('loading')

			const contractAddress = JointContract.address[networkType];	
            await Promise.all([
                getAccountsByIds(
                    viteApi,
                    contractAddress,
                    JointContract.abi,
                    [accountId],
                    vite.constant.Vite_TokenId
                ).then(accounts => {
                    if(cancel)return

			        setAccount(accounts[0])
                }),
                getMembers(
                    viteApi,
                    contractAddress,
                    JointContract.abi,
                    accountId
                ).then(members => {
                    if(cancel)return

			        setMembers(members)
                })
            ])		
		})()
		.catch(err => {
			if(cancel)return
			console.error(err);
			setAccount(err);
		})
		
		return () => {
			cancel = true;
		}
	}, [networkType, viteApi, accountId, accountDataRefreshId])
    
    const onSend = useCallback(async (hash:string) => {
        if(account === 'loading')return
        const receiveBlock = await waitResponse(
            viteApi,
            hash!
        )
        const [event] = await getLogsByAccountBlock(
            viteApi,
            receiveBlock.hash,
            JointContract.abi,
            'MotionCreated'
        )
        const state:Partial<State> = {
            toast: i18n.transactionConfirmed
        }
        if(account.approvalThreshold === '1'){
            // immediately confirmed by self
            // request refresh of account data
            refreshAccountData()
        }else{
            // move to motions tab
            state.activeTab = i18n.motions
            state.motionId = event.returnValues.motionId
        }

        setState(state);
        setOpenModal('');
    }, [account, i18n, refreshAccountData, setState, viteApi])

    if(account === 'loading' || members === 'loading')return <Loading/>
    const editDisabled = account.isStatic ||
        !members.includes(vcInstance?.accounts[0])

	return (
		<>
			<div className='flex flex-row'>
                <p className="text-2xl flex-grow">{i18n.accountInfo}</p>
                <button
					className={`h-8 w-8 p-1.5 mr-1 brightness-button transition duration-200 ${
                        displaySettings.hidden ? 'text-skin-highlight' : ''
                    }`}
					onClick={() => {
                        setDisplaySettings({
                            ...displaySettings,
                            hidden: !displaySettings.hidden
                        })
					}}
				>
					<EyeSlashIcon className="text-inherit" />
				</button>
                <button
					className={`h-8 w-8 p-1.5 ml-1 brightness-button transition duration-200 ${
                        displaySettings.favorite ? 'text-yellow-400' : ''
                    }`}
					onClick={() => {
                        setDisplaySettings({
                            ...displaySettings,
                            favorite: !displaySettings.favorite
                        })
					}}
				>
					<StarIcon className="text-inherit" />
				</button>
            </div>
			<div className="bg-skin-middleground rounded-md p-8">
                <span className="font-bold">{i18n.balances}</span>
                <Balances/>
            </div>

			<div className="bg-skin-middleground rounded-md p-8">
                <span className="font-bold">
                    {i18n.memberCount.replace('{count}', account.memberCount.toString())}
                </span>
                {members.map((member, i) => {
                    return <MemberCard
                        key={i}
                        member={member}
                        onRemove={() => {
                            setOpenModalData(member)
                            setOpenModal('remove-member')
                        }}
                        disableRemove={
                            editDisabled ||
                            members.length === Number(account.approvalThreshold)
                        }
                    />
                })}
            </div>

			<MemberInputCard
                onAddMember={(member:string) => {
                    setOpenModalData(member)
                    setOpenModal('add-member')
			    }}
                members={members}
                confirm
                disabled={editDisabled}
            />

            <div className="bg-skin-middleground rounded-md p-8">
                <div className='flex flex-row w-full gap-4'>
                    <TextInput
                        numeric
                        label={i18n.threshold}
                        value={account.approvalThreshold}
                        maxDecimals={18}
                        onUserInput={()=>{}}
                        disabled
                        containerClassName='flex-grow'
                    />
                    <button
                        className={`${
                            !editDisabled ? 'bg-skin-button-alt brightness-button' : 'bg-gray-400'
                        } h-8 px-3 rounded-md font-semibold text-skin-button-alt shadow flex-grow-1 h-12`}
                        onClick={() => {
                            setOpenModalData('')
                            setOpenModal('change-threshold')
                        }}
                        disabled={editDisabled}
                    >
                        {i18n.modifyThreshold}
                    </button>
                </div>
                <div className='mt-5'>
                    <Switch value={account.isStatic} disabled>
                        {i18n.staticAccount}
                    </Switch>
                </div>
                <div>
                    <Switch value={account.isMemberOnlyDeposit} disabled>
                        {i18n.memberDepositOnly}
                    </Switch>
                </div>
            </div>
            {openModal === 'add-member' && <Modal onClose={() => setOpenModal('')}>
                <MotionConfirm motion={{
                    type: 'add-member',
                    params: [openModalData]
                }} onConfirm={async () => {
					try {
                        const {hash} = await callContract(
                            JointContract,
                            'createAddMemberMotion',
                            [accountId, openModalData]
                        );
                        await onSend(hash!)
					} catch (err) {
						if (err instanceof Error) {
							console.error(err);
                            setState({ toast: err.message });
                            setOpenModal('');
						} else {
							if (typeof err === 'object' && err !== null) {
								const error = err as any;
								if (error.message && error.code === CANCELED) {
									setState({ toast: i18n.canceled });
									setOpenModal('');
								}
							}
						}
					}
                }} onClose={() => {
                    setOpenModal('')
                }}/>
            </Modal>}

            {openModal === 'remove-member' && <Modal onClose={() => setOpenModal('')}>
                <MotionConfirm motion={{
                    type: 'remove-member',
                    params: [openModalData]
                }} onConfirm={async () => {
					try {
                        const {hash} = await callContract(
                            JointContract,
                            'createRemoveMemberMotion',
                            [accountId, openModalData]
                        );
                        await onSend(hash!)
					} catch (err) {
						if (err instanceof Error) {
							console.error(err);
                            setState({ toast: err.message });
                            setOpenModal('');
						} else {
							if (typeof err === 'object' && err !== null) {
								const error = err as any;
								if (error.message && error.code === CANCELED) {
									setState({ toast: i18n.canceled });
									setOpenModal('');
								}
							}
						}
					}
                }} onClose={() => {
                    setOpenModal('')
                }}/>
            </Modal>}
            {openModal === 'change-threshold' && <Modal onClose={() => setOpenModal('')}>
                {openModalData ? <MotionConfirm motion={{
                    type: 'change-threshold',
                    params: [openModalData]
                }} onConfirm={async () => {
					try {
                        const {hash} = await callContract(
                            JointContract,
                            'createChangeThresholdMotion',
                            [accountId, openModalData]
                        );
                        await onSend(hash!)
					} catch (err) {
						if (err instanceof Error) {
							console.error(err);
                            setState({ toast: err.message });
                            setOpenModal('');
						} else {
							if (typeof err === 'object' && err !== null) {
								const error = err as any;
								if (error.message && error.code === CANCELED) {
									setState({ toast: i18n.canceled });
									setOpenModal('');
								}
							}
						}
					}
                }} onClose={() => {
                    setOpenModal('')
                }}/> : <ModifyThreshold
                    members={members}
                    onValue={(value) => {
                        setOpenModalData(value)
                    }}
                />}
            </Modal>}
		</>
	);
};

export default connect(AccountInfo);
