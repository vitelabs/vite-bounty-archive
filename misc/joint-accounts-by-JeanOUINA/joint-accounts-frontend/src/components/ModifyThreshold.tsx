import { useRef, useState } from 'react';
import TextInput, { TextInputRefObject } from './TextInput';
import { connect } from '../utils/globalContext';
import { validateInputs } from '../utils/misc';
import { State } from '../utils/types';

type Props = State & {
    members: string[],
    onValue: (value:string) => void
};

const ModifyThreshold = ({ i18n, onValue, members }: Props) => {
	const [threshold, thresholdSet] = useState('');
	const thresholdRef = useRef<TextInputRefObject>();

	return (
		<>
			<p className="text-2xl">{i18n.modifyThreshold}</p>

            <TextInput
                numeric
                _ref={thresholdRef}
                label={i18n.threshold}
                value={threshold}
                maxDecimals={18}
                onUserInput={(v) => thresholdSet(v)}
                getIssue={(v) => {
                    if (+v <= 0) {
                        return i18n.amountMustBePositive;
                    }
                    if (+v % 1 !== 0) {
                        return i18n.positiveIntegersOnly;
                    }
                    if (+v > members.length) {
                        return i18n.thresholdTooBig;
                    }
                }}
                containerClassName="w-full mt-5"
            />
			<div className="flex flex-col gap-4 mt-5">
				<button
					className={'bg-skin-medlight brightness-button h-8 px-3 rounded-md font-semibold text-white shadow'}
					onClick={async () => {
                        if (validateInputs([thresholdRef])) {
                            onValue(threshold)
                        }
					}}
				>
					{i18n.modifyThreshold}
				</button>
			</div>
		</>
	);
};

export default connect(ModifyThreshold);
