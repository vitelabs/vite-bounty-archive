import React, { useState } from 'react';
import MyButton from '../UI/button/MyButton';
import { useHistory } from 'react-router-dom';
import MyModal from '../UI/modal/MyModal';
import TokenInfo from './TokenInfo';


const TokenItem = ({token, isAllTokens}) => {
    const [modalInfo, setModalInfo] = useState(false);
    const router = useHistory();
    return (
        <div className="token">
                <div className="token__content">
                <h3 style={{marginLeft: '0%'}}>{token.name}</h3>
                    <div className="token__body">
                       <h4 style={{marginLeft: '0%'}}> {token.description}</h4>
                    </div>
                </div>
                <img width={250} height={250} src={`https://gateway.ipfs.io/ipfs/${token.img}`} />
                {isAllTokens
                ?   <div>
                    <MyButton onClick={() => {setModalInfo(true)}} >info</MyButton>
                    <MyModal visible={modalInfo} setVisible={setModalInfo}>
                        <TokenInfo
                            token={token}
                        />
                    </MyModal>
                    </div>
                : <MyButton 
                    style={{marginLeft:'5%'}}
                    onClick={() => router.push({pathname:`/mytokens/${token.id}`, state: token})}
                    >open</MyButton>
                }
        </div>
    );
};

export default TokenItem;