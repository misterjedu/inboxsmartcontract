// contract test code will go here
const assert = require('assert')
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());


class Car{
    park(){
        return 'stopped';
    }


    drive(){
        return 'vroom';
    }
}


let car;

beforeEach(() =>{
    car = new Car();
})


describe('Car', () =>{ 

    it('can park', () =>{
        assert.strictEqual(car.park(), 'stopped');
    } );

    it('can drive', () =>{
    
        assert.strictEqual(car.drive(), 'vroom');
    })

});



