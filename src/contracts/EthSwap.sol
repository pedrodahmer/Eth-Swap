// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange ";
    Token public token;
    uint256 public rate = 100;

    event TokenPruchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );
    
    event TokenSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buytokens() public payable {
        //Calculate the number of tokens to buy
        //Amount of Ethereum * Redemption rate (# of tokens they receive for 1 ehter)
        uint256 tokenAmount = msg.value * rate;

        //Verify if there is enough tokens to buy
        require(token.balanceOf(address(this)) >= tokenAmount);

        //Transfers tokens to the user
        token.transfer(msg.sender, tokenAmount);

        //Emit an event
        emit TokenPruchased(msg.sender, address(token), tokenAmount, rate);
    }

    function selltokens(uint _amount) public {
        //User cant sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        //Calculate the amount of Ether to redeem
        uint etherAmount = _amount / rate; //Amount of the exchange divided by the rate

        //Require that EthSwap has enough Ether
        require(address(this).balance >= etherAmount);

        //Perform scale
        token.transferFrom(msg.sender, address(this), _amount); //ERC-20 function for spending tokens
        msg.sender.transfer(etherAmount);  
        
        //Emit an event
        emit TokenSold(msg.sender, address(token), _amount, rate);
    }
}
