import React, {useState, useEffect} from 'react';
import TokenList from '../components/TokenList';
import '../styles/App.css';
import TokenService from '../API/TokenService';
import Loader from '../UI/loader/Loader';
import { useFetching } from '../hooks/UseFetching';


function AllTokens() {

const [tokens, setTokens] = useState([]);

const [fetchTokens, isTokensLoading, TokenError] = useFetching ( async() => {
  const tokens = await TokenService.getAllTokens();
  console.log(tokens);
  setTokens(tokens);
});


useEffect(() => {
  fetchTokens();
}, [])


  return (
    <div className="App">
     { isTokensLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
          <Loader/>
        </div>
        : <div> {tokens.length > 0
            ? <TokenList
                tokens={tokens}
                isAllTokens={true}
              />
            : <h2>There are no tokens</h2>
          }
          </div>
      }
      
    </div>
  );
}

export default AllTokens;