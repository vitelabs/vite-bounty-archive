import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation, useHistory } from "react-router-dom";
import { AuthContext } from '../context';
import MyButton from '../UI/button/MyButton';
import MyModal from '../UI/modal/MyModal';
import TokenService from '../API/TokenService';
import TransferApproveForm from '../components/TransferApproveForm';

const TokenIdPage = () => {

    const {account, setIsEvent, setEvent} = useContext(AuthContext);
    const [token, setToken] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [modal, setModal] = useState({
        transfer: false,
        approve: false
        });
    const params = useParams();
    const location = useLocation();
    const router = useHistory();

    const transfer = async(address) => {
        await TokenService.transferToken(account, address, params.id, eventDetected);
   
    }

    const approve = async(address) => {
        await TokenService.approveToken(account, address, params.id, eventDetected)
    }

    const burn = async() => {
        console.log(account);
        await TokenService.burnToken(account, params.id, eventDetected);
        
    } 

    const eventDetected = (event) => {
        console.log(event);
        setEvent(event);
        setIsEvent(true);
        router.push('/mytokens');
    };

    const isOwnerOfToken = async() => {
        const owner = await TokenService.isOwner(account, params.id);
        setIsOwner(owner);
    }
    useEffect( () => {
        console.log(location);
        setToken(location.state);
        isOwnerOfToken();
    }, [location])

    return (
        <div className="card">
            <h3><b>{token.name}</b></h3>
            <h4>{token.description}</h4>
            <img width={400} height={400} src={`https://gateway.ipfs.io/ipfs/${token.img}`} />
            <div className="token__btns">
                <MyButton onClick={() => setModal({...modal, transfer: true})}>
                    Transfer
                </MyButton>
                <MyModal visible={modal.transfer} setVisible={setModal}>
                    <TransferApproveForm
                        transferOrApprove={transfer}
                        isTransfer={true}
                    />
                </MyModal>
                <MyButton  
                    onClick={() => setModal({...modal, approve: true})}
                    disabled={!isOwner}
                    >
                    Approve
                </MyButton>
                <MyModal visible={modal.approve} setVisible={setModal}>
                    <TransferApproveForm
                        transferOrApprove={approve}
                        isTransfer={false}
                    />
                </MyModal>
                <MyButton 
                    onClick={() => burn()}
                    disabled={!isOwner}
                >
                    Burn
                </MyButton>
            </div>
        </div>
    );
};

export default TokenIdPage; 