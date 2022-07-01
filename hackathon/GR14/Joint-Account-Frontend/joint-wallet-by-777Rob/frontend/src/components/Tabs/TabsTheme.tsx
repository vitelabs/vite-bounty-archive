import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon, DesktopComputerIcon, RefreshIcon } from '@heroicons/react/outline';
import { connect, setStateType } from '../../utils/globalContext';

const TabsTheme = ({ i18n }: any) => {
	const [currentTab, setCurrentTab] = useState<any>('0');
	const navigate = useNavigate();

	return (
		<div
			className={` w-full max-w-5xl rounded-lg sm:border border-gray-200 bg-white overflow-hidden`}
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
				></select>
			</div>

			{/* :LARGE DEVICES */}
			<div className="hidden sm:block overflow-hidden">
				{/* ::Navigation Tabs */}
				<nav aria-label="Tabs">
					<ul className="grid grid-flow-col auto-cols-fr">
						<div
							className={`flex items-center text-skin-primary text-bold ${
								currentTab == '0'
									? 'bg-skin-highlight text-black'
									: 'text-gray-400 hover:bg-gray-50 hover:text-gray-500'
							} 'border-l border-gray-200`}
						>
							<button
								className={`p-2 w-full justify-center items-center text-center text-skin-primary font-semibold`}
								onClick={() => {
									setCurrentTab('1');
									localStorage.setItem('theme', 'dark');
									document.documentElement.classList.add('dark');
								}}
							>
								<MoonIcon
									className={`mr-2 h-5 w-5  ${false ? 'font-extrabold' : 'text-skin-secondary'}`}
								/>
								Dark
							</button>
						</div>
						<div
							className={`flex items-center text-skin-primary text-bold ${
								currentTab == '1' ? 'bg-skin-highlight text-white' : ' hover:bg-gray-50 '
							} 'border-l border-gray-200`}
						>
							<button
								className={`p-2 w-full justify-center items-center text-center font-semibold`}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => {
									localStorage.setItem('theme', 'light');
									document.documentElement.classList.remove('dark');
								}}
							>
								<SunIcon
									className={`mr-2 h-5 w-5  ${currentTab == '0' ? 'font-extrabold' : 'text-white'}`}
								/>
								<p className={`text-white`}>
									Light
									{i18n?.light[0].toUpperCase() + i18n?.light.substring(1)}
								</p>
							</button>
						</div>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default connect(TabsTheme);
