import React from "react";
import Web3 from 'web3';

const AuthContext = React.createContext({});


const authReducer = (state, action) => {
	switch (action.type) {
		case 'SET_ACCOUNT': {
			return {
				connected: action.payload.connected,
				status: action.payload.status,
				account: action.payload.account,
				contract: action.payload.contract
			}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

const initialState = {
	connected: false,
	status: null,
	account: null,
	contract: null
}

const AuthProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(authReducer, initialState);
	const value = {state, dispatch}

	// in case the wallet or the chain change, refresh the app
	React.useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on('accountsChanged', () => {
				window.location.reload()
			})
			window.ethereum.on('chainChanged', () => {
				window.location.reload()
			})
		}
	}, [])

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export {AuthContext, AuthProvider};
