const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const depositPath = path.resolve(__dirname, 'contracts', 'DepositYourEth.sol');
const source = fs.readFileSync(depositPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

console.log(output);
for (let contract in output) {
    let name = contract.replace(':', '');
    fs.outputJsonSync(
        path.resolve(buildPath, name.replace(':', '') + '.json'),
        output[contract]
    );
}