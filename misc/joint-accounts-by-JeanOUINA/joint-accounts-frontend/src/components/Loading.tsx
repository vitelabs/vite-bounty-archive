import { connect } from '../utils/globalContext';
import { State } from '../utils/types';
import Spinner from './Spinner';

const Loading = ({i18n}:State) => {
	return (
		<div className='justify-center content-center'>
            <Spinner size={64} className='m-auto'/>
            <p className='text-center mt-5 text-3xl'>{i18n.loading}</p>
        </div>
	);
};

export default connect(Loading);
