import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { explorerTxUrl, MotionType, NULL } from '../utils/constants';
import { ReactFormat } from '../utils/format';
import { connect } from '../utils/globalContext';
import { shortenHash } from '../utils/strings';
import { Events, State, TokenInfo } from '../utils/types';
import { getTicker } from '../utils/wallet';
import A from './A';
import { AccountChip, AddressChip } from './AccountChip';
import Chip from './Chip';

type Props = {
    event: Events
    tokens: Map<string, TokenInfo>
} & State;

const flexClasses = 'flex gap-1 justify-left items-center w-full'
const HistoryEventRow = ({event, tokens, i18n}: Props) => {
    const action = useMemo(() => {
        switch(event.event){
            case 'AccountCreated':
                return <ReactFormat
                    params={{
                        address: <AddressChip address={
                            event.returnValues.creator
                        } warn/>,
                        account: <AccountChip _accountId={event.returnValues.accountId} />
                    }}
                    className={flexClasses}
                >
                    {i18n.historyEvents.AccountCreated}
                </ReactFormat>
            case 'MotionCreated':
                switch(event.returnValues.motionType){
                    case MotionType.TRANSFER: {
                        const token = tokens.get(event.returnValues.tokenId)!
                        const amount = new BigNumber(event.returnValues.transferAmount)
                            .shiftedBy(-token.decimals)
                            .toFixed()
                        const ticker = getTicker(token)

                        return <ReactFormat
                            params={{
                                address: <AddressChip address={
                                    event.returnValues.proposer
                                } warn/>,
                                amount: <Chip level='info'>
                                    {i18n.amountTicker.replace('{amount}', amount).replace('{ticker}', ticker)}
                                </Chip>,
                                recipient: event.returnValues.destinationAccount === NULL ?
                                <AddressChip address={event.returnValues.to} /> :
                                <AccountChip _accountId={event.returnValues.destinationAccount} />,
                                motion: <Chip level='grey'>
                                    {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                                </Chip>
                            }}
                            className={flexClasses}
                        >
                            {i18n.historyEvents.MotionCreated.Transfer}
                        </ReactFormat>
                    }
                    case MotionType.ADD_MEMBER:
                        return <ReactFormat
                            params={{
                                address: <AddressChip address={event.returnValues.proposer} warn/>,
                                motion: <Chip level='grey'>
                                    {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                                </Chip>,
                                member: <AddressChip warn address={event.returnValues.to} />
                            }}
                            className={flexClasses}
                        >
                            {i18n.historyEvents.MotionCreated.AddMember}
                        </ReactFormat>
                    case MotionType.REMOVE_MEMBER:
                        return <ReactFormat
                            params={{
                                address: <AddressChip address={event.returnValues.proposer} warn/>,
                                motion: <Chip level='grey'>
                                    {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                                </Chip>,
                                member: <AddressChip error address={event.returnValues.to} />
                            }}
                            className={flexClasses}
                        >
                            {i18n.historyEvents.MotionCreated.RemoveMember}
                        </ReactFormat>
                    case MotionType.CHANGE_THRESHOLD:
                        return <ReactFormat
                            params={{
                                address: <AddressChip address={event.returnValues.proposer} warn/>,
                                motion: <Chip level='grey'>
                                    {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                                </Chip>,
                                threshold: <Chip level='success'>
                                    {event.returnValues.threshold === '1' ?
                                    i18n.thresholdSingular : i18n.thresholdPlural
                                    .replace('{threshold}', event.returnValues.threshold)}
                                </Chip>
                            }}
                            className={flexClasses}
                        >
                            {i18n.historyEvents.MotionCreated.ChangeThreshold}
                        </ReactFormat>
                    default:
                        return null
                }
            case 'MotionCancelled':
                return <ReactFormat
                    params={{
                        motion: <Chip level='error'>
                            {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                        </Chip>
                    }}
                    className={flexClasses}
                >
                    {i18n.historyEvents.MotionCancelled}
                </ReactFormat>
            case 'Vote':
                return <ReactFormat
                    params={{
                        address: <AddressChip address={event.returnValues.voter} warn/>,
                        motion: <Chip level='grey'>
                            {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                        </Chip>
                    }}
                    className={flexClasses}
                >
                    {event.returnValues.vote === '1' ? i18n.historyEvents.Vote : i18n.historyEvents.VoteCancel}
                </ReactFormat>
            case 'Transfer':
                const token = tokens.get(event.returnValues.tokenId)!
                const amount = new BigNumber(event.returnValues.amount)
                    .shiftedBy(-token.decimals)
                    .toFixed()
                const ticker = getTicker(token)

                return <ReactFormat
                    params={{
                        amount: <Chip level='info'>
                            {i18n.amountTicker.replace('{amount}', amount).replace('{ticker}', ticker)}
                        </Chip>,
                        recipient: event.returnValues.destinationAccount === NULL ?
                            <AddressChip address={event.returnValues.to} /> :
                            <AccountChip _accountId={event.returnValues.destinationAccount} />,
                        motion: <Chip level='success'>
                            {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                        </Chip>
                    }}
                    className={flexClasses}
                >
                    {i18n.historyEvents.Transfer}
                </ReactFormat>
            case 'MemberAdded':
                return <ReactFormat
                    params={{
                        address: <AddressChip address={event.returnValues.member}/>,
                        motion: <Chip level='success'>
                            {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                        </Chip>
                    }}
                    className={flexClasses}
                >
                    {i18n.historyEvents.MemberAdded}
                </ReactFormat>
            case 'MemberRemoved':
                return <ReactFormat
                    params={{
                        address: <AddressChip address={event.returnValues.member} error/>,
                        motion: <Chip level='success'>
                            {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                        </Chip>
                    }}
                    className={flexClasses}
                >
                    {i18n.historyEvents.MemberRemoved}
                </ReactFormat>
            case 'ThresholdChanged':
                return <ReactFormat
                    params={{
                        motion: <Chip level='success'>
                            {i18n.motionNum.replace('{motionId}', event.returnValues.motionId)}
                        </Chip>,
                        threshold: <Chip level='success'>
                            {event.returnValues.threshold === '1' ?
                            i18n.thresholdSingular : i18n.thresholdPlural
                            .replace('{threshold}', event.returnValues.threshold)}
                        </Chip>
                    }}
                    className={flexClasses}
                >
                    {i18n.historyEvents.ThresholdChanged}
                </ReactFormat>
            case 'Deposit': {
                const token = tokens.get(event.returnValues.tokenId)!
                const amount = new BigNumber(event.returnValues.amount)
                    .shiftedBy(-token.decimals)
                    .toFixed()
                const ticker = getTicker(token)
                
                return <ReactFormat
                    params={{
                        address: <AddressChip address={event.returnValues.from} warn/>,
                        amount: <Chip level='info'>
                            {i18n.amountTicker.replace('{amount}', amount).replace('{ticker}', ticker)}
                        </Chip>,
                        account: <AccountChip _accountId={event.returnValues.accountId} />
                    }}
                    className={flexClasses}
                >
                    {i18n.historyEvents.Deposit}
                </ReactFormat>
            }
        }
    }, [event, tokens, i18n])
	return (
		<tr>
            <td>
                <Chip level='info'>
                    <A href={explorerTxUrl(event.accountBlockHash)}>
                        {shortenHash(event.accountBlockHash)}
                    </A>
                </Chip>
            </td>
            <td>
                <Chip level={({
                    AccountCreated: 'success',
                    MotionCancelled: 'error',
                    Transfer: 'success',
                    MemberAdded: 'success',
                    MemberRemoved: 'success',
                    ThresholdChanged: 'success',
                    Deposit: 'info'
                })[event.event as string] as any || 'warning'}>
                    {event.event}
                </Chip>
            </td>
            <td>
                <AccountChip _accountId={event.returnValues.accountId}/>
            </td>
            <td>
                {action}
            </td>
        </tr>
	);
};

export default connect(HistoryEventRow);
