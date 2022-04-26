import React, {useState} from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';


const TransferApproveForm = ({transferOrApprove, isTransfer}) => {

    const [address, setAddress] = useState('');
 
    const transferOrApproveToken = async (e) => {
        e.preventDefault();
        transferOrApprove(address);
        setAddress('');
    };

    

    return (
        <div>
            <form>
                {isTransfer
                    ? <h4>Transfer token</h4>
                    : <h4>Approve token</h4>
                    }
                <MyInput 
                type="text"
                value={address}
                placeholder="enter the address"
                onChange={ (e) => setAddress(e.target.value)}    
                >
                </MyInput>
                <MyButton onClick={(e) => transferOrApproveToken(e)}>Submit</MyButton>
        </form>
      </div>
    );
};

export default TransferApproveForm;