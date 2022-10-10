import { useEffect, useMemo, useState } from 'react'
import { connect } from '../utils/globalContext'
import { getAccountsByIds, JointAccount } from '../utils/jointAccount'
import { State } from '../utils/types'
import JointContract from '../contracts/JointAccounts';
import * as vite from '@vite/vitejs'
import Loading from './Loading';
import MotionDescription from './MotionDescription';

type Motion = {
    type: 'add-member',
    params: [string]
} | {
    type: 'remove-member',
    params: [string]
} | {
    type: 'change-threshold',
    params: [string]
} | {
    type: 'transfer',
    params: [string, string, string]
}
type Props = State & {
    motion: Motion
    onConfirm: () => void
    onClose: () => void
};

const MotionConfirm = ({motion, i18n, accountId, networkType, viteApi, onConfirm, onClose}: Props) => {
    const [confirmed, setConfirmed] = useState(false)
	const [account, setAccount] = useState<'loading'|JointAccount>('loading');
	useEffect(() => {
		let cancel = false;

		(async () => {
			setAccount('loading')

			const contractAddress = JointContract.address[networkType];	
            await getAccountsByIds(
                viteApi,
                contractAddress,
                JointContract.abi,
                [accountId],
                vite.constant.Vite_TokenId
            ).then(accounts => {
                if(cancel)return

                setAccount(accounts[0])
            })		
		})()
		.catch(err => {
			if(cancel)return
			console.error(err);
			setAccount(err);
		})
		
		return () => {
			cancel = true;
		}
	}, [networkType, viteApi, accountId])

    const component = useMemo(() => {
        if(confirmed || account === 'loading')return null

        switch(motion.type){
            case 'add-member': {
                return <>
                    <p className='flex flex-wrap gap-1 justify-center items-center text-md font-semibold'>
                        <MotionDescription
                            type='add-member'
                            member={motion.params[0]}
                            warn
                        />
                    </p>
                    <p className='flex flex-wrap gap-1 justify-center items-center text-xs'>
                        <MotionDescription
                            type='add-member'
                            explain
                        />
                    </p>
                </>
            }
            case 'remove-member': {
                return <>
                    <p className='flex flex-wrap gap-1 justify-center items-center text-md font-semibold'>
                        <MotionDescription
                            type='remove-member'
                            member={motion.params[0]}
                            warn
                        />
                    </p>
                    <p className='flex flex-wrap gap-1 justify-center items-center text-xs'>
                        <MotionDescription
                            type='remove-member'
                            explain
                        />
                    </p>
                </>
            }
            case 'change-threshold': {
                return <>
                    <p className='flex flex-wrap gap-1 justify-center items-center text-md font-semibold'>
                        <MotionDescription
                            type='change-threshold'
                            threshold={motion.params[0]}
                            accountThreshold={account.approvalThreshold}
                        />
                    </p>
                    <p className='flex flex-wrap gap-1 justify-center items-center text-xs'>
                        <MotionDescription
                            type='remove-member'
                            threshold={motion.params[0]}
                            accountThreshold={account.approvalThreshold}
                            explain
                        />
                    </p>
                </>
            }
        }
    }, [motion.type, confirmed, account, motion.params])

    if(account === 'loading')return <Loading/>

    if(confirmed)return <p className='text-center text-lg font-semibold'>
        {i18n.confirmTransactionOnYourViteWalletApp}
    </p>
    return (
		<>
            <p className='text-2xl text-center mb-10'>{i18n.createMotion}</p>
            {component}
            <div className='flex gap-4 mt-10'>
                <button
                    className={'bg-skin-medlight brightness-button h-8 px-3 rounded-md font-semibold text-white shadow flex-grow'}
                    onClick={async () => {
                        onClose()
                    }}
                >
                    {i18n.cancel}
                </button>
                <button
                    className={'bg-red-500 brightness-button h-8 px-3 rounded-md font-semibold text-white shadow flex-grow'}
                    onClick={async () => {
                        setConfirmed(true)
                        onConfirm()
                    }}
                >
                    {i18n.confirm}
                </button>
            </div>
		</>
	);
};

export default connect(MotionConfirm);
