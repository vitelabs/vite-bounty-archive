import { ReactNode } from 'react';

type Props = {
    level: 'error'|'warning'|'info'|'success'|'grey'
    children: ReactNode
    wrap?: 'word'|'none'|'normal'
};

const Chip = ({level, children}: Props) => {
    const colors = {
        error: 'text-red-600',
        warning: 'text-yellow-600',
        success: 'text-green-600',
        info: 'text-blue-600',
        grey: 'text-gray-500'
    }
    const backgroundColors = {
        error: 'rgba(185,28,28,.3)',
        warning: 'rgba(161,98,7,.3)',
        success: 'rgba(21,128,61,.3)',
        info: 'rgba(29,78,216,.2)',
        grey: 'rgba(55,65,81,.2)'
    }
	return (
		<div className={`${
            colors[level]
        } flex justify-center items-center font-medium py-1 px-2 rounded-md`} style={{
            backgroundColor: backgroundColors[level] || 'transparent'
        }}>
            <div className={'whitespace-pre-line font-normal leading-none flex-initial'}>
                {children}
            </div>
        </div>
	);
};

export default Chip;
