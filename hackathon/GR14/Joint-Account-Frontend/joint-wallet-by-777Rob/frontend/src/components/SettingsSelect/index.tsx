import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { NetworkTypes, State } from '../../utils/types';
import { connect, setStateType } from '../../utils/globalContext';
import { SunIcon, MoonIcon, DesktopComputerIcon, RefreshIcon } from '@heroicons/react/outline';
import { prefersDarkTheme } from '../../utils/misc';

type IconProps = {
	className?: string;
};

type MenuItemStatus = {
	active: boolean;
};

const SettingsSelect = ({ i18n, setState }: State) => {
	const themes: [typeof SunIcon, string][] = [
		[SunIcon, i18n?.light],
		[MoonIcon, i18n?.dark],
		[DesktopComputerIcon, i18n?.system],
	];

	const currentThemeIsLight: boolean = localStorage.theme === 'light';

	return (
		<div className="top-16 w-56 text-right">
			<Menu as="div" className="relative bg-skin-foreground inline-block text-left">
				<div>
					<Menu.Button className="inline-flex  w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						<CogIcon />
						<ChevronDownIcon
							className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
							aria-hidden="true"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-skin-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						{/* <div className="px-2 py-2"> */}
						{/* <Menu.Item>
							<div className="">Theme</div>
						</Menu.Item> */}
						{/* </div> */}
						<div>
							<Menu.Item>
								{({ active }: MenuItemStatus) => (
									<button
										// key={label}
										className={`${
											active ? 'bg-skin-lowlight' : ''
										} text-whitegroup flex w-full  items-center rounded-md px-2 py-2 text-sm`}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => {
											localStorage.setItem('theme', 'light');
											document.documentElement.classList.remove('dark');
										}}
									>
										<SunIcon
											className={`mr-2 h-5 w-5  ${
												false ? 'font-extrabold' : 'text-skin-secondary'
											}`}
										/>
										<p className={`text-skin-primary ${true ? 'font-extrabold' : ''}`}>
											{i18n?.light[0].toUpperCase() + i18n?.light.substring(1)}
										</p>
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }: MenuItemStatus) => (
									<button
										className={`${
											active ? 'bg-skin-lowlight' : ''
										} text-whitegroup flex w-full items-center rounded-md px-2 py-2 text-sm`}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => {
											localStorage.setItem('theme', 'dark');
											document.documentElement.classList.add('dark');
										}}
									>
										<MoonIcon
											className={`mr-2 h-5 w-5  ${
												false ? 'font-extrabold' : 'text-skin-secondary'
											}`}
										/>
										<p className={`text-skin-primary ${true ? 'font-extrabold' : ''}`}>
											{i18n?.dark[0].toUpperCase() + i18n?.dark.substring(1)}
										</p>
									</button>
								)}
							</Menu.Item>

							<Menu.Item>
								{({ active }: MenuItemStatus) => (
									<button
										// className={`fx  px-2 w-full h-7 bg-skin-foreground text-skin-primary`}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => {
											localStorage.languageType = 'en';
											setState({ languageType: 'en' });
										}}
										className={`${
											active ? 'bg-skin-lowlight' : ''
										} text-whitegroup flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<DuplicateActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
										) : (
											<DuplicateInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
										)}
										EN
									</button>
								)}
							</Menu.Item>

							{/* <Menu.Item>
								{({ active }: MenuItemStatus) => (
									<button
										className={`${
											active ? 'bg-skin-lowlight' : ''
										} text-whitegroup flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{active ? (
											<DuplicateActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
										) : (
											<DuplicateInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
										)}
										Duplicate
									</button>
								)}
							</Menu.Item> */}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

const DuplicateInactiveIcon = ({ className }: IconProps) => {
	return (
		<svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 4H12V12H4V4Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 8H16V16H8V8Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
};

const DuplicateActiveIcon = ({ className }: IconProps) => {
	return (
		<svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 4H12V12H4V4Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 8H16V16H8V8Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
};

const CogIcon = ({ className }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-5 w-5"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fillRule="evenodd"
				d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export default connect(SettingsSelect);
