import { useRef, useState } from 'react';

type Props = {
    options: {value:string,label:string}[]
    selected?: string
    id?:string
    label:string
    onChange: (value:string) => void
};

const Select = ({id, selected, options, label, onChange}: Props) => {
	const input = useRef<HTMLSelectElement | null>();
	const [focused, focusedSet] = useState(false);
	return <div className="relative">
        <label
            htmlFor={id}
            onMouseDown={() => setTimeout(() => input.current!.click(), 0)}
            className={`absolute transition-all pt-0.5 w-[calc(100%-1.2rem)] duration-200 ${
                focused || selected
                    ? 'bg-skin-middleground top-0.5 left-2 font-bold text-xs'
                    : 'top-2.5 left-2.5'
            } ${focused ? 'text-skin-highlight' : 'text-skin-muted'}`}
        >
            {label}
        </label>
        <select
            id={id}
            className={`px-2 pt-4 w-full text-lg block bg-skin-middleground transition duration-200 border-2 rounded ${
                focused
                    ? 'border-skin-highlight shadow-md'
                    : 'shadow border-skin-alt'
            } resize-none`}
            onChange={(ev) => {
                onChange(ev.target.value)
            }}
            onFocus={() => {
                focusedSet(true);
            }}
            onBlur={() => {
                focusedSet(false);
            }}
            ref={(tag) => {
                input.current = tag
            }}
            value={selected}
        >
            {options.map((option, i) => {
                return <option
                    key={i}
                    value={option.value}
                >
                    {option.label}
                </option>
            })}
        </select>
    </div>;
};

export default Select;
