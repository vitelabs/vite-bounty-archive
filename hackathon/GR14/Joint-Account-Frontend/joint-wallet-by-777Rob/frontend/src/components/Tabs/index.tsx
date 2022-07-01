import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Tab = {
	name: string;
	link: string;
};

export type TabsProps = {
	tabs: Tab[];
	onTabChange?: Function;
	className?: string;
	size?: string;
};

const Tabs = ({ tabs, onTabChange, className, size }: TabsProps) => {
	const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);
	const navigate = useNavigate();

	return (
		<div
			className={`${className} w-full max-w-5xl rounded-lg sm:border border-gray-200 bg-white overflow-hidden`}
		>
			{/* :SMALL DEVICES */}
			<div className="mx-auto w-full max-w-md sm:hidden rounded-lg border border-gray-300 overflow-hidden">
				<label htmlFor="current-tab" className="sr-only">
					Select a tab
				</label>
				<select
					name="current-tab"
					id="current-tab"
					onChange={
						(value: any) => console.log(value)
						// setCurrentTab(value)
					}
					defaultValue="Overview"
					value={currentTab}
					className="form-select w-full sm:w-auto block border-none text-sm text-gray-500 font-semibold cursor-pointer focus:ring-0"
				>
					{tabs.map((tab) => (
						<option
							key={tab.name}
							onClick={() => navigate(tab.link, { replace: true })}
							value={tab.name}
						>
							{tab.name}
						</option>
					))}
				</select>
			</div>

			{/* :LARGE DEVICES */}
			<div className="hidden sm:block overflow-hidden">
				{/* ::Navigation Tabs */}
				<nav aria-label="Tabs">
					<ul className="grid grid-flow-col auto-cols-fr">
						{tabs.map((tab, index) => {
							const isCurrentTab = tab.name === currentTab;

							return (
								<div
									key={tab.name}
									className={`text-base ${
										isCurrentTab
											? 'bg-skin-highlight text-white'
											: 'text-gray-400 hover:bg-gray-50 hover:text-gray-500'
									} ${index !== 0 && 'border-l border-gray-200'}`}
								>
									<button
										className={`p-2 w-full justify-center items-center text-center text-${
											!size ? 'xl' : size
										} font-semibold`}
										onClick={() => {
											setCurrentTab(tab.name);
											navigate(tab.link);
										}}
									>
										{tab.name}
									</button>
								</div>
							);
						})}
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Tabs;
