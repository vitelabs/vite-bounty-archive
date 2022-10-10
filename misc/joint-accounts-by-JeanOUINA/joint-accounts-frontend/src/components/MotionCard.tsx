import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';
import { CANCELED, MotionType, NULL } from '../utils/constants';
import { connect } from '../utils/globalContext';
import { getHasVoted, getMembers, JointAccount, Motion } from '../utils/jointAccount';
import { State, TokenInfo } from '../utils/types';
import { getToken, waitResponse } from '../utils/viteScripts';
import { getTicker } from '../utils/wallet';
import Chip from './Chip';
import JointContract from '../contracts/JointAccounts';
import ViteConnectButton from '../containers/ViteConnectButton';
import Modal from './Modal';
import { AddressChip } from './AccountChip';
import Loading from './Loading';
import MotionDescription from './MotionDescription';

type Props = State & {
    motion: Motion
    account: JointAccount
    expanded?: boolean
    refreshMotion: () => void
};

const TransferMotion = ({viteApi, motion, i18n}: Pick<Props, 'viteApi'|'motion'|'i18n'>) => {
    const [token, setToken] = useState<'loading'|TokenInfo>('loading')

	useEffect(() => {
		let cancel = false

		;(async () => {
			setToken('loading')

			const token = await getToken(viteApi, motion.tokenId)
			if(cancel)return
			
            setToken(token)
		})()
		return () => {
			cancel = true
		}
	}, [viteApi, motion.tokenId])

    const amount = useMemo(() => {
        if(token === 'loading')return null
        const amount = new BigNumber(motion.transferAmount)
            .shiftedBy(-token.decimals)
            .toFixed()
        const ticker = getTicker(token)
        return i18n.amountTicker
            .replace('{amount}', amount)
            .replace('{ticker}', ticker)
    }, [motion.transferAmount, token, i18n])

    if(token === 'loading' || !amount)return <Loading/>

    return (
        <>
            <div className='flex flex-wrap gap-1 justify-center items-center'>
                <MotionDescription
                    type='transfer'
                    amount={amount}
                    recipient={motion.destinationAccount === NULL ? motion.to : motion.destinationAccount}
                    isAccount={motion.destinationAccount !== NULL}
                    warn={!motion.approved}
                />
            </div>
       </>
    )
}

const ChangeThresholdMotion = ({motion, account}: Pick<Props, 'motion'|'account'>) => {
    return (
        <div className='flex flex-wrap gap-1 justify-center items-center'>
            <MotionDescription
                type='change-threshold'
                threshold={motion.threshold}
                accountThreshold={account.approvalThreshold}
            />
        </div>
    );
}

const AddMemberMotion = ({networkType, motion, account, viteApi}: Pick<Props, 'networkType'|'viteApi'|'motion'|'account'>) => {
    const [members, setMembers] = useState<'loading'|string[]>('loading')

	useEffect(() => {
		let cancel = false

		;(async () => {
			setMembers('loading')

            const contractAddress = JointContract.address[networkType]
			const members = await getMembers(
                viteApi,
                contractAddress,
                JointContract.abi,
                account.id
            )
			if(cancel)return
			
            setMembers(members)
		})()
		return () => {
			cancel = true
		}
	}, [viteApi, account.id, networkType])

    if(members === 'loading')return <Loading/>

    const warn = !members.includes(motion.to)
    return (
        <div className='flex flex-wrap gap-1 justify-center items-center'>
            <MotionDescription
                type="add-member"
                member={motion.to}
                warn={warn}
            />
        </div>
    );
}

const RemoveMemberMotion = ({networkType, motion, account, viteApi}: Pick<Props, 'networkType'|'viteApi'|'motion'|'account'>) => {
    const [members, setMembers] = useState<'loading'|string[]>('loading')

	useEffect(() => {
		let cancel = false

		;(async () => {
			setMembers('loading')

            const contractAddress = JointContract.address[networkType]
			const members = await getMembers(
                viteApi,
                contractAddress,
                JointContract.abi,
                account.id
            )
			if(cancel)return
			
            setMembers(members)
		})()
		return () => {
			cancel = true
		}
	}, [viteApi, account.id, networkType])

    if(members === 'loading')return <Loading/>

    const warn = members.includes(motion.to)
    return (
        <div className='flex flex-wrap gap-1 justify-center items-center'>
            <MotionDescription
                type="remove-member"
                member={motion.to}
                warn={warn}
            />
        </div>
    );
}

const MotionCard = ({motion, account, viteApi, i18n, networkType, vcInstance, setState, callContract, refreshMotion}: Props) => {
	const [promptTxConfirmation, promptTxConfirmationSet] = useState(false);
    const [hasVoted, setHasVoted] = useState<'loading'|boolean>('loading')

    const state = useMemo(() => {
        if(motion.active)return <Chip level='warning'>{i18n.motionStatus.awaitingApproval} {motion.voteCount}/{account.approvalThreshold}</Chip>
        if(motion.approved)return <Chip level='success'>{i18n.motionStatus.approved}</Chip>
        
        return <Chip level='error'>{i18n.motionStatus.cancelled}</Chip>
    }, [motion.active, motion.approved, motion.voteCount, account, i18n])

    const motionBody = useMemo(() => {
        switch(motion.motionType){
            case MotionType.TRANSFER:
                return <TransferMotion
                    viteApi={viteApi}
                    motion={motion}
                    i18n={i18n}
                />
            case MotionType.CHANGE_THRESHOLD:
                return <ChangeThresholdMotion
                    motion={motion}
                    account={account}
                />
            case MotionType.ADD_MEMBER:
                return <AddMemberMotion
                    viteApi={viteApi}
                    motion={motion}
                    account={account}
                    networkType={networkType}
                />
            case MotionType.REMOVE_MEMBER:
                return <RemoveMemberMotion
                    viteApi={viteApi}
                    motion={motion}
                    account={account}
                    networkType={networkType}
                />
            default:
                return null
        }
    }, [motion, account, viteApi, i18n, networkType])

    const address = vcInstance?.accounts[0]

	useEffect(() => {
		let cancel = false

		;(async () => {
            if(!address)return setHasVoted(false)
			setHasVoted('loading')

            const contractAddress = JointContract.address[networkType]
			const hasVoted = await getHasVoted(
                viteApi,
                contractAddress,
                JointContract.abi,
                account.id,
                motion.motionId,
                address
            )
			if(cancel)return
			
            setHasVoted(hasVoted)
		})()
		return () => {
			cancel = true
		}
	}, [viteApi, account.id, networkType, address, motion.motionId])
    const motionButtons = useMemo(() => {
        if(!motion.active || hasVoted === 'loading')return null
        
        const buttons = []
        if(!address){
            buttons.push(<ViteConnectButton />)
        }else{
            buttons.push(
                <button
                    key="approve"
                    className={`${
                        hasVoted ? 'bg-red-500' : 'bg-skin-medlight'
                    } brightness-button h-8 px-3 rounded-md font-semibold text-white shadow`}
                    onClick={async () => {
                        try {
                            promptTxConfirmationSet(true);
                            const {hash} = await callContract(
                                JointContract, 
                                hasVoted ? 'cancelVote' : 'voteMotion',
                                [
                                    account.id,
                                    motion.motionId
                                ]
                            );
                            await waitResponse(viteApi, hash!)
                            setState({
                                toast: i18n.transactionConfirmed,
                            });
                            refreshMotion()
                            promptTxConfirmationSet(false);
                        } catch (err) {
                            if (err instanceof Error) {
                                console.error(err);
                            } else {
                                if (typeof err === 'object' && err !== null) {
                                    const error = err as any;
                                    if (error.message && error.code === CANCELED) {
                                        setState({ toast: i18n.canceled });
                                        promptTxConfirmationSet(false);
                                    }
                                }
                            }
                        }
                    }}
                >
                    {hasVoted ? i18n.cancelVote : i18n.vote}
                </button>
            );
            
            if(address === motion.proposer){
                buttons.push(
                    <button
                        key="cancel-motion"
                        className='bg-red-500 brightness-button h-8 px-3 rounded-md font-semibold text-white shadow'
                        onClick={async () => {
                            try {
                                promptTxConfirmationSet(true);
                                const {hash} = await callContract(
                                    JointContract, 
                                    'cancelMotion',
                                    [
									    account.id,
									    motion.motionId
								    ]
                                );
								await waitResponse(viteApi, hash!)
								setState({
									toast: i18n.transactionConfirmed,
								});
                                refreshMotion()
								promptTxConfirmationSet(false);
                            } catch (err) {
                                if (err instanceof Error) {
                                    console.error(err);
                                } else {
                                    if (typeof err === 'object' && err !== null) {
                                        const error = err as any;
                                        if (error.message && error.code === CANCELED) {
                                            setState({ toast: i18n.canceled });
                                            promptTxConfirmationSet(false);
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        {i18n.cancelMotion}
                    </button>
                );
            }
        }
        return buttons
    }, [
        address,
        motion.active,
        motion.motionId,
        motion.proposer,
        setState,
        i18n,
        callContract,
        viteApi,
        hasVoted,
        account,
        refreshMotion
    ])

	return (
		<div className='bg-skin-middleground rounded-md p-8'>
            <div className='flex flex-row gap-4 pb-3'>
                <span className='font-bold flex-grow'>
                    {i18n.motionNum.replace('{motionId}', motion.motionId)}
                </span>
                {state}
            </div>
            <div className='flex flex-row flex-wrap gap-4 mb-3 pb-3 border-b border-skin-line-divider'>
                <span className='text-xs flex-grow'>
                    {i18n.proposedBy}
                </span>
                <AddressChip warn full address={motion.proposer}/>
            </div>
            <p className='text-xl text-center flex-grow mb-5 w-fit mx-auto'>
                <Chip level='grey'>
                    {i18n.motionType[
                        Object.keys(MotionType)[
                            Object.values(MotionType).indexOf(motion.motionType)
                        ] as keyof typeof i18n.motionType
                    ]}
                </Chip>
            </p>
            {motionBody}
            <div className='flex w-full flex-col mt-5 gap-4'>
                {motionButtons}
            </div>
			{!!promptTxConfirmation && (
				<Modal onClose={() => promptTxConfirmationSet(false)}>
					<p className="text-center text-lg font-semibold">
						{i18n.confirmTransactionOnYourViteWalletApp}
					</p>
				</Modal>
			)}
		</div>
	);
};

export default connect(MotionCard);
