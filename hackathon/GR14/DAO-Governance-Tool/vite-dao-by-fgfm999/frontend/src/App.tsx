import "./assets/styles/main.scss"
import { useEffect, useState } from 'react';
import Router from './containers/Router';
import { Provider } from './utils/globalContext';
import { getValidVCSession, initViteConnect } from './utils/viteConnect';
import { State } from './utils/types';

const App = () => {
  const [initialState, initialStateSet] = useState<object>();

  localStorage.networkType = 'testnet'

  useEffect(() => {
    (async () => {
      const vcSession = getValidVCSession();
      const state: Pick<State, 'networkType' | 'languageType' | 'vcInstance'> = {
        networkType: localStorage.networkType || 'testnet',
        languageType: localStorage.languageType || 'en',
        vcInstance: vcSession ? initViteConnect(vcSession) : null,
      };
      initialStateSet(state);
    })();
  }, []);

  return initialState ? (
    <Provider initialState={initialState}>
      <Router />
    </Provider>
  ) : null;
};

export default App;
