pragma solidity ^0.5.0;

contract Counter {
    uint counter;
    
    function increment() public {
        counter++;
    }
    
    function getCounter() external view returns(uint) {
        return counter;
    }
}