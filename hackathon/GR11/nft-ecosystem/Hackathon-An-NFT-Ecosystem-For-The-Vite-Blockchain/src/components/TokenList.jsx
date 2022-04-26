import React from 'react';
import TokenItem from './TokenItem';

const TokenList = ({tokens, isAllTokens}) => {
    return (
        <div>
            {tokens.map( (token) =>
                <TokenItem
                    key={token.id}
                    token={token}
                    isAllTokens={isAllTokens}
                />
            )}   
        </div>  
    );
};

export default TokenList;