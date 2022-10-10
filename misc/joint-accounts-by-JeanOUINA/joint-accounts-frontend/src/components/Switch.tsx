import { useMemo } from 'react';

type Props = {
    value: boolean
    setValue?: (value:boolean) => void
    children: string
    disabled?: boolean
};

let toggleIndex = 0
const Switch = ({
    value,
    setValue,
    children,
    disabled = false
}: Props) => {
    const id = useMemo(() => {
        return `toggle-${toggleIndex++}`
    }, [])
	return (
        <label htmlFor={id} className={`inline-flex relative items-center${(!disabled && ' cursor-pointer') || ''}`}>
            <input
                type="checkbox"
                value={(value && 'true') || 'false'}
                id={id}
                className="sr-only peer"
                onChange={(ev) => {
                    setValue!(ev.target.checked)
                }}
                disabled={disabled}
            />
            <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer bg-skin-base peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</span>
        </label>
	);
};

export default Switch;