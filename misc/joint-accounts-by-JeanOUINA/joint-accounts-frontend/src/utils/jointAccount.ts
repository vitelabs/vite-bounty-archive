import * as vite from '@vite/vitejs/distSrc/utils/type';
import { MotionType } from './constants';
import { getContractState, getPastEvents } from './viteScripts';

export interface JointAccount {
    id: string;
    memberCount: number;
    approvalThreshold: string;
    motionCount: number;
    balances: Record<string, string>;
    isStatic: boolean;
    isMemberOnlyDeposit: boolean;
    favorite: boolean;
    hidden: boolean;
}
export interface Motion {
    accountId: string,
    motionId: string,

    motionType: MotionType,
    tokenId: string,
    transferAmount: string,
    to: string,
    destinationAccount: string,
    threshold: string,
    
    proposer: string,
    voteCount: number,
    active: boolean,

    approved: boolean
}

export async function getMembers(
    viteApi:vite.ViteAPI,
    contractAddress: string,
    abi: any[],
    accountId:string,
):Promise<string[]>{
    const result = await getContractState(
        viteApi,
        contractAddress,
        abi,
        'getMembers',
        [accountId]
    );
    if(result === null)throw Error('`getMembers` call reverted');
    const [members]:string[][] = result!
    return members
}

export async function balancesOf(
    viteApi:vite.ViteAPI,
    contractAddress: string,
    abi: any[],
    accountId:string,
    tokens:string[]
):Promise<string[]>{
    const result = await getContractState(
        viteApi,
        contractAddress,
        abi,
        'balancesOf',
        [accountId, tokens]
    );
    if(result === null)throw Error('`balancesOf` call reverted');
    const [balances]:string[][] = result!
    return balances
}

export async function getAccountsIdsByMember(
    viteApi:vite.ViteAPI,
    contractAddress: string,
    abi: any[],
    member:string,
):Promise<string[]>{
    const result = await getContractState(
        viteApi,
        contractAddress,
        abi,
        'getAccountsByMember',
        [member]
    );
    if(result === null)throw Error('`getAccountsByMember` call reverted');
    const [accountsIds]:string[][] = result!
    return accountsIds
}

export async function getAccountsByIds(
    viteApi:vite.ViteAPI,
    contractAddress: string,
    abi: any[],
    accountsIds:string[],
    token:string
):Promise<JointAccount[]>{
    const result = await getContractState(
        viteApi,
        contractAddress,
        abi,
        'getAccounts',
        [accountsIds, token]
    );
    if(result === null)throw Error('`getAccounts` call reverted');
    const [uint256Array, boolArray]:string[][] = result!

    const accounts:JointAccount[] = []
    for(let i = 0; i < accountsIds.length; i++){
        accounts.push({
            id: accountsIds[i],

            memberCount: Number(uint256Array[i*4+0]),
            approvalThreshold: uint256Array[i*4+1],
            motionCount: Number(uint256Array[i*4+2]),
            balances: {
                [token]: uint256Array[i*4+3]
            },

            isStatic: boolArray[i*2+0] === '1',
            isMemberOnlyDeposit: boolArray[i*2+1] === '1',

            hidden: localStorage.getItem(`account-${accountsIds[i]}-hidden`) === 'true',
            favorite: localStorage.getItem(`account-${accountsIds[i]}-favorite`) === 'true'
        })
    }

    return accounts
}

export async function getMotion(
    viteApi:vite.ViteAPI,
    contractAddress: string,
    abi: any[],
    accountId:string,
    motionId:string
):Promise<Motion>{
    const [
        motionType,
        tokenId,
        transferAmount,
        to,
        destinationAccount,
        threshold,

        proposer,
        voteCount,
        active
    ] = await Promise.all(([
        ['motionType', [accountId, motionId]],
        ['tokenId', [accountId, motionId]],
        ['transferAmount', [accountId, motionId]],
        ['to', [accountId, motionId]],
        ['destinationAccount', [accountId, motionId]],
        ['threshold', [accountId, motionId]],
        ['proposer', [accountId, motionId]],
        ['voteCount', [accountId, motionId]],
        ['active', [accountId, motionId]]
    ] as [string, string[]][]).map(async ([name, args]) => {
        const result = await getContractState(
            viteApi,
            contractAddress,
            abi,
            name,
            args
        );
        if(result === null)throw Error('`'+name+'` call reverted');
        return result[0]
    }))

    let approved = false;
    if(active !== '1'){
        // inactive, means cancelled/approved
        // search for MotionCancelled event
        // if exists, means cancelled

        const events = await getPastEvents(
            viteApi,
            contractAddress,
            abi,
            'MotionCancelled',
            {
                filter: {
                    accountId: accountId,
                    motionId: motionId
                }
            }
        );
        approved = !events.length;
    }
    
    return {
        accountId,
        motionId,

        motionType: motionType as MotionType,
        tokenId,
        transferAmount,
        to,
        destinationAccount,
        threshold,

        proposer,
        voteCount: Number(voteCount),
        active: active === '1',
        
        approved
    }
}

export async function getHasVoted(
    viteApi:vite.ViteAPI,
    contractAddress: string,
    abi: any[],
    accountId:string,
    motionId:string,
    voter:string,
):Promise<boolean>{
    const result = await getContractState(
        viteApi,
        contractAddress,
        abi,
        'voted',
        [accountId, motionId, voter]
    );
    if(result === null)throw Error('`voted` call reverted');
    const [hasVoted]:string[] = result!
    return hasVoted === '1'
}