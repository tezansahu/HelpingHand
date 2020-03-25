const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


function getBalance(address, callback){
    web3.eth.getBalance(address).then(bal => callback(bal));
}

module.exports = {
    getBalance
}