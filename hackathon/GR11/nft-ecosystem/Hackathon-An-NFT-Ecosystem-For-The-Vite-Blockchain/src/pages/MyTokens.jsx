import React, {useState, useEffect, useContext } from 'react';
import TokenForm from '../components/TokenForm';
import TokenList from '../components/TokenList';
import '../styles/App.css';
import MyModal from '../UI/modal/MyModal';
import MyButton from '../UI/button/MyButton';
import Loader from '../UI/loader/Loader';
import { AuthContext } from '../context';
import TokenService from '../API/TokenService';
import { useFetching } from '../hooks/UseFetching';
import EventInfo from '../components/EventInfo';


const MyTokens = () => {

  const {account, event, setIsEvent, isEvent, setEvent} = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [approvedTokens, setApprovedTokens] = useState([]);
  const newToken = {
    id: '',
    name: '',
    description: '',
    img: ''
  }

  const createToken = async(metadata, data) => {
    newToken.name = data.name;
    newToken.description = data.description;
    newToken.img = data.img;
  await  TokenService.createToken(metadata, account, eventDetected);
}

const [fetchTokens, isTokensLoading, TokenError] = useFetching ( async() => {
  const tokens = await TokenService.getTokensOf(account);
  console.log('FETCH');
  console.log(tokens);
  setTokens(tokens);
});

const [fetchApprovedTokens, isApprovedTokensLoading, approvedTokenError] = useFetching ( async() => {
  const approvedTokens = await TokenService.getApprovedTokens(account);
  setApprovedTokens(approvedTokens);
});

const eventDetected = (event) => {
  setEvent(event);
  setIsEvent(true);
  newToken.id = event._tokenId;
  setTokens([...tokens, newToken]);
};


useEffect(() => {
  fetchTokens();
  fetchApprovedTokens();
  return () => {
    setModal(false)
    setTokens([])
    setApprovedTokens([])
  }
}, [])

  return (

       <div className="App"> 
       {!isTokensLoading  && !isApprovedTokensLoading
        ? <div> 
                <MyButton style={{marginTop: '30px', marginLeft: '40%'}} onClick={() => setModal(!modal)}> 
                  Create Token
                </MyButton>
          
                <MyModal visible={modal} setVisible={setModal} >
                  <TokenForm
                    createToken={createToken}
                  />
                </MyModal> 
        {tokens.length > 0
        ? <TokenList
            tokens={tokens}
            allTokens={false}
          />
        : <h2>You have no tokens</h2>
        }
        
        {approvedTokens.length > 0
          ? <div>
              <h2>You are approved for these tokens</h2>
              <TokenList
                tokens={approvedTokens}
                allTokens={false}
              />
          </div> 
          : null}
          </div>
          : <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
          <Loader/>
        </div>}
        <MyModal visible={isEvent} setVisible={setIsEvent}>
          <EventInfo
              event={event}
          />
      </MyModal>
        </div>

  );
}

export default MyTokens;