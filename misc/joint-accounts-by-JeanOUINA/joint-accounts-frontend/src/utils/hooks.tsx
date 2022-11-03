import { useCallback, useEffect, useRef, useState } from 'react';
import { JointAccount } from './jointAccount';

export const useKeyPress = (targetKey: string, handler: () => void, allowDefault?: boolean) => {
	const savedHandler = useRef<() => void>();
	const called = useRef<boolean>();
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const onDown = (e: KeyboardEvent) => {
			if (e.key === targetKey && savedHandler.current && !called.current) {
				!allowDefault && e.preventDefault();
				savedHandler.current();
				called.current = true;
			}
		};
		const onUp = () => (called.current = false);
		if (savedHandler.current) {
			window.addEventListener('keydown', onDown);
			window.addEventListener('keyup', onUp);
		}
		return () => {
			window.removeEventListener('keydown', onDown);
			window.removeEventListener('keyup', onUp);
		};
	}, [targetKey, handler, allowDefault]);
};

export const useTitle = (title?: string) => {
	useEffect(() => {
		document.title = `${title ? `${title} - ` : ''}Joint Accounts`;
	}, [title]);
};

export const useRefresh = () => {
	const [refreshId, setRefreshId] = useState(0)

	return [refreshId, () => {
		setRefreshId(id => id+1)
	}] as [number, () => void]
}

export type AccountDisplaySettings = {
	hidden: boolean,
	favorite: boolean
}
export const useAccountDisplaySettings = (account: JointAccount) => {
	const [state, setState] = useState<AccountDisplaySettings>(() => {
		const hidden = localStorage.getItem(`account-${account.id}-hidden`) === 'true'
		const favorite = localStorage.getItem(`account-${account.id}-favorite`) === 'true'
		return { hidden, favorite }
	})
	if(account.hidden !== state.hidden){
		account.hidden = state.hidden
	}
	if(account.favorite !== state.favorite){
		account.favorite = state.favorite
	}

	const callback = useCallback((settings: AccountDisplaySettings) => {
		localStorage.setItem(`account-${account.id}-hidden`, settings.hidden ? 'true' : 'false')
		localStorage.setItem(`account-${account.id}-favorite`, settings.favorite ? 'true' : 'false')
		account.hidden = settings.hidden
		account.favorite = settings.favorite
		setState(settings)
	}, [account])

	return [state, callback] as [AccountDisplaySettings, (settings: AccountDisplaySettings) => void]
}