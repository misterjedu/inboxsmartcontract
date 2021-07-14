// contract test code will go here
const assert = require('assert')
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const HI_THERE = "Hi there!"
const BYE = "bye"

beforeEach (async () =>{
  // Get a list of all unlocked eth accounts precreated by ganached 
  accounts = await web3.eth.getAccounts()
    
  //Use one of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode, arguments: [HI_THERE]})
  .send({from: accounts[0], gas: '1000000'})
});



describe('Inbox', () => {
    it('deploys a contract', () => {
    //Log the inbox contract object
    // console.log(inbox);

    //Assert that there's an address string in the inbox object 
    //This tells if the contract was successfully deployed. 
    assert.ok(inbox.options.address);
    });

    //Assert that when contract is depoyed, the message property has the default message set
    it('has a default message', async () =>{
        const message = await inbox.methods.message().call();
        assert.ok(message, HI_THERE);
    });

    it('can change the message', async () => {
        //Call the setMessage function and specify the account you are using to do the transaction
       await inbox.methods.setMessage(BYE).send({from : accounts[0]});
        const message = await inbox.methods.message().call();
        assert.ok(message, BYE);

    });

})