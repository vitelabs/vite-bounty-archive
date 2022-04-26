const fs = require('fs');

function contractInfo ()  {

    try {
        // read contents of the file
        const data = fs.readFileSync('contract.txt', 'UTF-8');
        // split the contents by new line
        const lines = data.split(/\r?\n/);
        const binary = lines[11];
        const off_chain = lines[13];
        const abi = lines[15];
        fs.writeFile('config.js', `const binary = "${binary}" \nconst off_chain = "${off_chain}" \n const ABI = ${abi} \nmodule.exports = { binary, off_chain, ABI }`, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})
        // const binary = lines[11];
        // const off_chain = lines[13];
        // const abi = lines[15];
        //  return [binary, off_chain, abi];
    } catch (err) {
        console.error(err);
    }   
}
function main() {
    contractInfo ();
    return 0;
}

main();
