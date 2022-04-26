import { connect } from '../utils/wep-state';
import { State } from '../utils/types';
import { PROD } from '../utils/constants';

type Props = State & {
  className?: string;
};

const DisconnectButton = ({ className, vbInstance, setState }: Props) => {
  return (
    <button
      className={`minor ${className}`}
      onClick={() => {
        if (PROD) {
          vbInstance.killSession(); // Throws error from @vite/connector - not great in dev
        }
        setState!({ vbInstance: null }); // TODO: update types so that you don't have to use setState!
      }}
    >
      Disconnect
    </button>
  );
};

export default connect('vbInstance')(DisconnectButton);
