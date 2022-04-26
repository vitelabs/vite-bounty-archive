import A from '../components/A';
import { State } from '../utils/types';
import { connect } from '../utils/wep-state';

type Props = State & {
  className?: string;
};

const AccountButton = ({ className, vbInstance }: Props) => {
  return (
    <A to={`/address/${vbInstance.accounts[0]}`} className={`block minor ${className}`} title={vbInstance.accounts[0]}>
      {vbInstance.accounts[0].substring(0, 10)}...{vbInstance.accounts[0].substring(50)}
    </A>
  );
};

export default connect('vbInstance')(AccountButton);
