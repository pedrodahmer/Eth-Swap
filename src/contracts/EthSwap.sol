// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange ";
    Token public token;
    uint256 public rate = 100;

    constructor(Token _token) public {
        token = _token;
    }

    function buytokens() public payable {
        //Calculate the number of tokens to buy
        //Amount of Ethereum * Redemption rate (# of tokens they receive for 1 ehter)
        uint256 tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);
    }
}
