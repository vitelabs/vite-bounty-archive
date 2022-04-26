import bs58 from 'bs58';
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default class IPFSService {
 static async  createMetaData(fileBuffer, token) {

    let ipfsHashFile = await ipfs.add(fileBuffer);
    const data = JSON.stringify({ 
          name: token.name,
          description: token.description,
          img:  ipfsHashFile[0].hash
        }, null, ' ');
  
    const buffer = await Buffer.from(data);
    ipfsHashFile = await ipfs.add(buffer);
    const shorten = (hash) => '0x' + bs58.decode(hash).slice(2).toString('hex');
    const short_hash = shorten(ipfsHashFile[0].hash);
    console.log(short_hash);
    return [short_hash, data];
    
  }

  static async getData(result) {
    const hash = bs58.encode(Buffer.from('1220'+result[0], 'hex'));
    const content = fetch("https://gateway.ipfs.io/ipfs/"+hash)
                        .then((result) =>{return result.text()} );
    const getData =  JSON.parse(await content);
    return getData;
  }
 }