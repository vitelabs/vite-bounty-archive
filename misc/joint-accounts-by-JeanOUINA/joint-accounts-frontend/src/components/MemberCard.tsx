import { XMarkIcon } from '@heroicons/react/24/solid';
import '../styles/font.css'

type Props = {
    member:string
    onRemove?: ()=>void
    disableRemove?:boolean
};

const MemberCard = ({
    member,
    onRemove,
    disableRemove
}: Props) => {
	return (
		<div
            className="w-[calc(100%-1.2rem)] border-b-2 border-skin-line-divider flex justify-between mt-5"
        >
            <span className="break-all overpass-mono">{member}</span>
            {!disableRemove && <XMarkIcon
                className="h-5 w-5 text-red-500 cursor-pointer shrink-0"
                onClick={onRemove}
            />}
        </div>
	);
};

export default MemberCard;
