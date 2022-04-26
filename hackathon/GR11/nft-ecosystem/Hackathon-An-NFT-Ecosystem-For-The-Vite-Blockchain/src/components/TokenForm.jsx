import React, {useState} from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import IPFSService from '../API/IPFSService';


const TokenForm = ({createToken}) => {


    const [token, setToken] = useState({
        name: '',
        description: ''
      });
      const [buffer, setBuffer] = useState('');

      async function convertToBuffer (reader)  {
        //  file is converted to a buffer for upload to IPFS
            const buffer = await Buffer.from(reader.result);
            await setBuffer(buffer);
        };
      
      function captureFile (e)  {
        e.stopPropagation()
        e.preventDefault()
        const file = e.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => convertToBuffer(reader)  
        };

       const addNewToken = async (e) => {
        e.preventDefault();
        const [metadata, data] = await IPFSService.createMetaData(buffer, token);
        setToken({name: '', description: ''});
        createToken(metadata, JSON.parse(data));
  
      };

     

    return (
        <div>
            <form>
                <MyInput 
                type="text"
                value={token.name}
                placeholder="enter token name"
                onChange={ (e) => setToken({...token, name: e.target.value})}    
                >
                </MyInput>
                <MyInput 
                type="text"
                value={token.description}
                placeholder="enter description"
                onChange={ (e) => setToken({...token, description: e.target.value})}    
                >
                </MyInput>
                <MyInput 
                id="fileUpload" 
                type="file" 
                style={{display: 'none'}} 
                onChange={captureFile}
                >
                </MyInput>
                <label htmlFor="fileUpload" class="custom-file-upload">
                    <i className="fa fa-cloud-upload"></i> Choose file
                </label>
                <MyButton style={{marginLeft: '35%'}} onClick={(e) => addNewToken(e)}>Create Token</MyButton>
        </form>
        

      </div>
    );
};

export default TokenForm;