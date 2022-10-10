import { useEffect, useMemo, useState } from 'react';
import { connect } from '../utils/globalContext';
import { getAccountsByIds, getMotion, JointAccount, Motion } from '../utils/jointAccount';
import JointContract from '../contracts/JointAccounts';
import { State } from '../utils/types';
import * as vite from '@vite/vitejs'
import { useRefresh } from '../utils/hooks';
import Modal from './Modal';
import MotionCard from './MotionCard';
import Loading from './Loading';

type Props = State & {};

const Motions = ({networkType, viteApi, accountId, motionId: _motionId, i18n, setState}: Props) => {
	const [account, setAccount] = useState<'loading'|JointAccount>('loading');
    const [motionRefreshId, refreshMotion] = useRefresh()
    const [motionId, setMotionId] = useState(_motionId || '')
    const [motion, setMotion] = useState<'loading'|Motion|null>(motionId ? 'loading' : null)
    const [motions, setMotions] = useState<'loading'|Motion[]>('loading')

    useEffect(() => {
        return () => {
            setState({
                motionId: null as unknown as string
            })
        }
    }, [setState])

    useEffect(() => {
		let cancel = false;

		(async () => {
			setAccount('loading')

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
	}, [networkType, viteApi, accountId, motionRefreshId])

    useEffect(() => {
        if(!motionId)return setMotion(null)

        setMotion('loading')
        let cancel = false

        getMotion(
            viteApi,
            JointContract.address[networkType],
            JointContract.abi,
            accountId,
            motionId
        ).then(motion => {
            if(cancel)return
            setMotion(motion)
        }).catch(err => {
            if(cancel)return
            setState({
                toast: err.message
            })
            setMotion(null)
            setMotionId('')
        })
        return () => {
            cancel = true
        }
    }, [motionId, networkType, viteApi, accountId, setState, motionRefreshId])

    useEffect(() => {
        setMotions('loading')
        if(account === 'loading')return

        const range = []
        for(let i = Math.max(0, account.motionCount-5); i < account.motionCount;i++){
            range.push(i)
        }
        range.reverse()

        if(!range.length)return setMotions([])

        let cancel = false

        const contractAddress = JointContract.address[networkType]
        Promise.all(range.map(i => {
            return getMotion(
                viteApi,
                contractAddress,
                JointContract.abi,
                accountId,
                String(i)
            )
        })).then(motions => {
            if(cancel)return
            setMotions(motions)
        })

        return () => {
            cancel = true
        }
    }, [account, viteApi, accountId, networkType, motionRefreshId])

    const motionModal = useMemo(() => {
        if(!motion || motion === 'loading' || account === 'loading')return null

        return <Modal onClose={() => setMotionId('')}>
            <MotionCard
                motion={motion}
                account={account}
                refreshMotion={refreshMotion}
            />
        </Modal>
    }, [motion, account, refreshMotion])

    if(motions === 'loading' || account === 'loading')return <Loading/>

	return (
        <>
            <p className="text-2xl flex-grow">{i18n.motions}</p>
            {motions.map(motion => {
                return <MotionCard key={motion.motionId} motion={motion} account={account} refreshMotion={refreshMotion} />
            })}
            {motionModal}
        </>
	);
};

export default connect(Motions);
