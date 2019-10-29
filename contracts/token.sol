pragma solidity ^0.5.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "./counter.sol";

contract SampleToken is ERC20, ERC20Detailed {

    string private _name = "SAMPLE";
    string private _symbol = "SPT";
    uint8 private _decimals = 18;

    address account = msg.sender;
    uint value = 100 * 10 ** 18;
    
    address counterContract = 0x2C7b2Bbcad4a7372eB5CE062524d7A993e18D9a2;

    constructor() ERC20Detailed( _name, _symbol, _decimals) public {
        _mint(account, value);
    }
    
    function transfer_increment(address receipient, uint256 amount) public {
        Counter counter = Counter(address(counterContract));
        counter.increment();
        
        super.transfer(receipient, amount);
    }
    
}