import BigNumber from 'bignumber.js';
import { connect } from '../utils/globalContext';
import { JointAccount } from '../utils/jointAccount';
import { State } from '../utils/types';
import * as vite from '@vite/vitejs'
import { useAccountDisplaySettings } from '../utils/hooks';
import { StarIcon } from '@heroicons/react/24/solid';

type Props = State & {
    account: JointAccount,
    refresh: () => void
};

const AccountCard = ({setState, account, refresh, i18n}: Props) => {
    const [displaySettings, setDisplaySettings] = useAccountDisplaySettings(account)

    if(displaySettings.hidden)return null
	return (
        <div
            className='p-5 bg-skin-middleground brightness-button p-8 cursor-pointer' 
            onClick={() => {
                setState({
                    accountId: account.id,
                    activeTab: i18n.account
                });
            }}
        >
            <div className="flex flex-row justify-center gap-2">
                <p className='text-center'>
                    {i18n.accountId.replace('{id}', account.id)}
                </p>
                <button
                    className={`h-6 w-6 brightness-button transition duration-200 ${
                        displaySettings.favorite ? 'text-yellow-400' : ''
                    }`}
                    onClick={(e) => {
                        e.stopPropagation()
                        setDisplaySettings({
                            ...displaySettings,
                            favorite: !displaySettings.favorite
                        })
                        refresh()
                    }}
                >
                    <StarIcon className="text-inherit" />
                </button>
            </div>
            <p className='text-left'>
                {i18n.members}: <strong>
                    {i18n.memberCount.replace('{count}', account.memberCount.toString())}
                </strong>
            </p>
            <p className='text-left'>{i18n.thresholdShort}: <strong>
                {account.approvalThreshold === '1' ?
                i18n.thresholdSingular : i18n.thresholdPlural
                .replace('{threshold}', account.approvalThreshold)}
            </strong></p>
            <p className='text-left'>{i18n.viteBalance}: <strong>
                {
                    i18n.amountTicker
                    .replace(
                        '{amount}',
                        new BigNumber(account.balances[vite.constant.Vite_TokenId])
                        .shiftedBy(-vite.constant.Vite_Token_Info.decimals)
                        .toFixed()
                    ).replace('{ticker}', vite.constant.Vite_Token_Info.tokenSymbol)
                }
            </strong></p>
        </div>
	);
};

export default connect(AccountCard);
