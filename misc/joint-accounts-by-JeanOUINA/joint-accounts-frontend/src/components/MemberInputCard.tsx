import { wallet } from '@vite/vitejs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { connect } from '../utils/globalContext';
import { validateInputs } from '../utils/misc';
import { State } from '../utils/types';
import TextInput, { TextInputRefObject } from './TextInput';

type Props = State & {
    onAddMember: (member:string)=>void
    confirm?: boolean
    members: string[]
    address?: string
    disabled?: boolean
};

const MemberInputCard = ({
    onAddMember,
    confirm = false,
    i18n,
    members,
    address,
    disabled
}: Props) => {
	const [memberAddress, memberAddressSet] = useState('');
	// REVIEW: The latest vite-express version uses a different input paradigm that is a lot cleaner.
	// https://github.com/vitelabs/vite-express/blob/master/frontend/src/containers/TextInput.tsx#L14
	const memberAddressRef = useRef<TextInputRefObject>();
    useEffect(() => {
        if(confirm || disabled)return
        if(!wallet.isValidAddress(memberAddress))return
        if(!memberAddressRef.current?.isValid)return

        onAddMember(memberAddress)
        memberAddressSet('')
    }, [confirm, memberAddress, onAddMember, members, disabled])
    const shouldDisplaySelfAdd = useMemo(() => {
        if(disabled)return false
        if(!address)return false
        if(members.includes(address))return false
        return true
    }, [members, address, disabled])
	return (
        <div className="bg-skin-middleground rounded-md p-8">
            <span className="font-bold">{i18n.addMember}</span>
            <div
                className="w-[calc(100%-1.2rem)] flex flex-col justify-between mt-5"
            >
                <TextInput
                    _ref={memberAddressRef}
                    label={i18n.memberAddress}
                    value={memberAddress}
                    onUserInput={(v) => memberAddressSet(v.trim())}
                    getIssue={(v) => {
                        if (!wallet.isValidAddress(v)) {
                            return i18n.invalidAddress;
                        }

                        if(members.includes(v)){
                            return i18n.duplicateMember
                        }
                    }}
                    className='w-full'
                    disabled={disabled}
                />
                {confirm && <button
                    className={`${
                        !disabled ? 'bg-skin-button-alt brightness-button' : 'bg-gray-400'
                    } h-8 px-3 rounded-md font-semibold text-skin-button-alt shadow mt-5`}
                    onClick={() => {
                        if (validateInputs([memberAddressRef])) {
                            memberAddressSet('');
                            onAddMember(memberAddress)
                        }
                    }}
                    disabled={disabled}
                >
                    {i18n.confirm}
                </button>}
                {shouldDisplaySelfAdd && <button
                    className='bg-skin-button-alt brightness-button h-8 px-3 rounded-md font-semibold text-skin-button-alt shadow mt-5'
                    onClick={() => {
                        onAddMember(address!)
                    }}
                >
                    {i18n.addMemberSelf}
                </button>}
            </div>
        </div>
	);
};

export default connect(MemberInputCard);
