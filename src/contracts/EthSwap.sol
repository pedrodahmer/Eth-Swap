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
}
