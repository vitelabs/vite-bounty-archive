import { TranslateIcon } from '@heroicons/react/outline';
import { setStateType } from '../../utils/globalContext';
import DropdownButton from '../DropdownButton';

export function Language(languages: string[][], setState: setStateType) {
	return (
		<DropdownButton
			buttonJsx={
				<div className="w-8 h-8 xy">
					<TranslateIcon className="text-white w-7 h-7" />
				</div>
			}
			dropdownJsx={
				<>
					{languages.map(([language, shorthand]) => {
						const active =
							localStorage.languageType === shorthand ||
							(!localStorage.languageType && shorthand === 'en');
						return (
							<button
								key={language}
								className={`fx  px-2 w-full h-7 bg-skin-foreground text-skin-primary`}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => {
									localStorage.languageType = shorthand;
									setState({ languageType: shorthand });
								}}
							>
								{language}
							</button>
						);
					})}
				</>
			}
		/>
	);
}
