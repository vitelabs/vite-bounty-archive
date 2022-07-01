import A from 'components/A';
import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';
import { FcSafe } from 'react-icons/fc';
import { RiCopperCoinFill } from 'react-icons/ri';
import { BsBriefcaseFill } from 'react-icons/bs';
import { RiShieldFill } from 'react-icons/ri';
import { SiBitcoinsv } from 'react-icons/si';
import { IoMdSwap } from 'react-icons/io';
import { ReactElement } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { BiWallet } from 'react-icons/bi';
import { MdSwapHoriz } from 'react-icons/md';
import { ImPlus } from 'react-icons/im';

type IconsTitle = {
	text: string;
	icon: ReactElement<any, any>;
};

type IconsTitleInternational = {
	// https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
	[key: string]: IconsTitle[];
};

type Props = State;

const FeatureCards: IconsTitleInternational = {
	en: [
		{
			text: 'Manage portfolio',
			icon: <BsBriefcaseFill />,
		},
		{
			text: 'Protected funds securely',
			icon: <RiShieldFill />,
		},
		{
			text: 'Most tokens supported',
			icon: <SiBitcoinsv />,
		},
		{
			text: 'Escrow services',
			icon: <IoMdSwap />,
		},
	],
};

const Instructions: IconsTitleInternational = {
	en: [
		{
			text: 'Connect your account',
			icon: <MdAccountCircle />,
		},
		{
			text: 'Create joint account',
			icon: <BiWallet />,
		},
		{
			text: 'Deposit tokens',
			icon: <ImPlus />,
		},
		{
			text: 'Start managing funds',
			icon: <MdSwapHoriz />,
		},
	],
};

const Landing = ({ i18n }: Props) => {
	useTitle('Home');

	return (
		<div>
			<div className="mx-auto lg:px-48 grid grid-cols-1 gap-x-16 sm:px-6 sm:py-32 lg:grid-cols-2 bg-skin-middleground ">
				<div>
					<p className="text-5xl font-extrabold ">{i18n.titleLanding}</p>
					<ol className="text-2xl mt-72">
						{i18n.featuresText.map((feature: string) => (
							<li className="flex items-center">
								<RiCopperCoinFill className="text-skin-highlight" fontSize="32px" />
								{feature}
							</li>
						))}
					</ol>
					<A
						to="/app"
						className="mt-9 px-8 py-4 font-semibold rounded-lg text-3xl bg-skin-highlight text-white shadow brightness-button"
					>
						{i18n.launchApp}
					</A>
				</div>
				<div className="flex-col items-center">
					<FcSafe size="720px" />
				</div>
			</div>

			<div className="mx-auto lg:px-48 mt-36 flex-col item-center">
				<p className="text-5xl font-extrabold text-center mb-12">What's possible</p>
				<div className="mt-6  mx-auto sm:px-6 lg:max-w-8xl lg:px-8 lg:grid lg:grid-cols-4 justify-center">
					{FeatureCards[i18n.featuresCards].map((feature: IconsTitle) => (
						<div className="bg-skin-foreground text-center rounded-xl w-72 py-16 px-2 mt-10 mb-10">
							<div className="text-white p-3 text-center inline-flex items-center justify-center w-36 h-36 mb-12 shadow-lg rounded-full bg-skin-medlight text-7xl">
								{feature.icon}
							</div>
							<h6 className="text-4xl font-bold text-center">{feature.text}</h6>
						</div>
					))}
				</div>
			</div>

			<div className="mx-auto lg:px-48 mt-36 flex-col item-center">
				<p className="text-5xl font-extrabold text-center mb-12">How does it work?</p>
				<div className="mt-6  mx-auto sm:px-6 lg:max-w-8xl lg:px-8 lg:grid lg:grid-cols-2 justify-center">
					{Instructions[i18n.featuresCards].map((feature: IconsTitle) => (
						<div className="bg-skin-foreground text-center rounded-xl mr-10 ml-10 py-16 px-2 mt-10 mb-10">
							<div className="text-white p-3 text-center inline-flex items-center justify-center w-36 h-36 mb-12 shadow-lg rounded-full bg-skin-medlight text-7xl">
								{feature.icon}
							</div>
							<h6 className="text-4xl font-bold text-center">{feature.text}</h6>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default connect(Landing);
