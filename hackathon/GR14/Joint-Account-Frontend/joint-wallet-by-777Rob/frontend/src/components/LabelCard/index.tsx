import { ReactElement } from 'react';

const LabelCard = ({
	svgIcon,
	title,
	children,
	className,
}: {
	svgIcon: ReactElement<any, any>;
	title: string;
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={`bg-skin-foreground rounded-lg  flex-col py-4 px-2 ${className}`}>
			<div className="flex justify-center align-middle rounded-lg flex-col">
				<div className="bg-skin-alt h-8 rounded-2xl justify-left items-center flex w-60">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						fill="currentColor"
						className="h-12 w-12 bg-skin-foreground p-3 text-skin-blue rounded-3xl border-gray-400 border-y-2 border-x-2  dark:text-gray-800"
					>
						{svgIcon}
					</svg>
					<p className="font-bold ml-2 text-skin-blue">{title}</p>
				</div>
			</div>
			<div className="py-1 space-y-2 mt-3 px-2">{children}</div>
		</div>
	);
};

export default LabelCard;
