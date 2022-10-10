import { connect } from '../utils/globalContext';
import { State } from '../utils/types';
import { AccountChip, AddressChip } from './AccountChip';
import Chip from './Chip';

type Props = {
    type: 'transfer'|'change-threshold'|'add-member'|'remove-member',
    amount?: string,
    recipient?: string,
    isAccount?: boolean,
    warn?: boolean,
    member?: string,
    threshold?: string,
    accountThreshold?: string,
    explain?: boolean,
    accountId?: string,
}

const MotionDescription = (props: Props&State) => {
    const {i18n} = props;
    let description = '';
    if(!props.explain){
        switch(props.type) {
            case 'transfer':
                description = i18n.motionCard.transfer
            break
            case 'change-threshold':
                description = i18n.motionCard.changeThreshold
            break
            case 'add-member':
                description = i18n.motionCard.addMember
            break
            case 'remove-member':
                description = i18n.motionCard.removeMember
            break
        }
    }else{
        switch(props.type) {
            case 'transfer':
                description = i18n.motionCard.transfer
            break
            case 'change-threshold':
                description = i18n.motionCard.changeThresholdExplanation
            break
            case 'add-member':
                description = i18n.motionCard.addMemberDetailExplanation
            break
            case 'remove-member':
                description = i18n.motionCard.removeMemberExplanation
            break
        }
    }
    if(!description)return null
		// REVIEW: Similar issue with format.tsx. Regular expressions are inefficient. I'd try making a simpler solution that doesn't rely on regexes.
    const parts = description.split(/_/g)
    const children = []
    for(let i = 0; i < parts.length; i++) {
        const part = parts[i]
        if(!/^{\w+}$/.test(part)){
            children.push(<span key={i}>{part}</span>)
            continue
        }

        let key = part.slice(1, -1)
        switch(props.type){
            case 'add-member':
            case 'remove-member': {
                const {member, warn, accountId} = props
                switch(key){
                    case 'member':
                        children.push(<div className='text-xs' key={i}>
                            <AddressChip address={member!} warn={warn!} full/>
                        </div>)
                        break
                    case 'account':
                        children.push(<AccountChip
                            _accountId={accountId!}
                            warn={warn}
                            key={i}
                        />)
                        break
                    default:
                        children.push(<span key={i}>{part}</span>)
                }
                break
            }
            case 'transfer': {
                const {amount, recipient, isAccount, warn} = props
                switch(key){
                    case 'amount':
                        children.push(<Chip level='info' key={i}>
                            {amount}
                        </Chip>)
                        break
                    case 'account':
                        children.push(isAccount ?
                            <div className='text-xs' key={i}>
                                <AddressChip
                                    address={recipient!}
                                    warn={warn}
                                    full
                                />
                            </div> :
                            <AccountChip
                                _accountId={recipient!}
                                warn={warn}
                                key={i}
                            />
                        )
                        break
                }
                break
            }
            case 'change-threshold': {
                // eslint-disable-next-line prefer-const
                let {threshold, accountThreshold, accountId} = props
                if(key === 'oldThreshold'){
                    const e = accountThreshold
                    threshold = accountThreshold
                    accountThreshold = e
                    key = 'threshold'
                }
                switch(key){
                    // eslint-disable-next-line no-fallthrough
                    case 'threshold':
                        children.push(<Chip level={
                            threshold === accountThreshold ? 'success' : 'warning'
                        } key={i}>
                            {threshold === '1' ?
                                i18n.thresholdSingular :
                                i18n.thresholdPlural.replace('{threshold}', threshold!)}
                        </Chip>)
                        break
                    case 'account':
                        children.push(<AccountChip
                            _accountId={accountId!}
                            warn={false}
                            key={i}
                        />)
                        break
                }
                break
            }
        }
    }

    return <>
        {children}
    </>
};

export default connect(MotionDescription);
