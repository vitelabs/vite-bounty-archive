import { explorerAddressUrl } from '../utils/constants'
import { connect } from '../utils/globalContext'
import { shortenAddress } from '../utils/strings'
import { State } from '../utils/types'
import A from './A'
import Chip from './Chip'

export const AccountChip = connect(({_accountId: accountId, warn, i18n}: {_accountId: string, warn?: boolean}&State) => {
    return (
        <Chip level={warn ? 'warning' : 'success'}>
            {
                i18n.accountId
                .replace('{id}', accountId)
            }
        </Chip>
    )
})

export const AddressChip = ({address, warn, error, full}: {address: string, warn?: boolean, error?: boolean, full?:boolean}) => {
    return (
        <Chip level={warn ? 'warning' : error ? 'error' : 'success'}>
            <A href={explorerAddressUrl(address)}>
                <span className='overpass-mono' style={full ? {
                    fontSize: '10px'
                } : {}}>
                    {full ? address : shortenAddress(address)}
                </span>
            </A>
        </Chip>
    )
}