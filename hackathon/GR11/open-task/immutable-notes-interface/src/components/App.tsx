import '../index.css';
import { Provider } from '../utils/wep-state';
import Router from './Router';

const App = () => (
  <Provider
    initialState={{
      vbInstance: null,
      timelines: {},
      notes: {},
    }}
  >
    <Router />
  </Provider>
);

export default App;
