import React, { useState, useEffect } from 'react';
import TokenService from '../API/TokenService';

const TokenInfo = ({token}) => {

    const [tokenInfo, setTokenInfo] = useState({
        name: token.name,
        id: token.id,
        owner: '',
        aprrovedAddress: ''
    });

    const fetchInfo = async() => {
        const owner = await TokenService.getOwner(token.id);
        const approvedAddress = await TokenService.getApprovedAddress(token.id);
        console.log(approvedAddress);
        setTokenInfo({...tokenInfo, owner, approvedAddress})
        
    }

    useEffect( () => {
        fetchInfo();
    }, [])

    return (
        <div >
            <h3 className="boxed">Name:   {tokenInfo.name}</h3>
            <h3 className="boxed">Id:  {tokenInfo.id}</h3>
            <h3 className="boxed">Owner: {tokenInfo.owner}</h3>
            {tokenInfo.approvedAddress !== ''
                ? <h3 className="boxed">Approved address: {tokenInfo.approvedAddress}</h3>
                : null }
            
        </div>
    );
};

export default TokenInfo;