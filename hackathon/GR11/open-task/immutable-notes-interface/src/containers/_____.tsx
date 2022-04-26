import { connect } from '../utils/wep-state';
import { State } from '../utils/types';

type Props = State & { key: string };

const _____ = ({ key }: Props) => {
  return (
    <div className="">
      <p>{key}</p>
    </div>
  );
};

export default connect('key')(_____);
