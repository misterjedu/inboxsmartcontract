
//Used to specify and unlock acccount to be used and what api/node to connect to
const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
const {interface, bytecode} = require('./compile')


//Provide your Mnemonics and infura api to the truffle wallet provider
const provider = new HDWalletProvider(
    'pull switch text hybrid lobster chuckle bulk puppy lawn any saddle discover',
    'https://rinkeby.infura.io/v3/c52d8fbd02fd43538ed647de181a4abe'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const acccounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from accoun', acccounts[0])

  const result =  await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments:["Hi there"]})
        .send({gas: '1000000', from : acccounts[0]})

    console.log('Contract deployed to', result.options.address);
};

deploy();


