const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

//Importing Chai
var chai = require("chai");
var assert = chai.assert; // Using Assert style

contract("EthSwap", (accounts) => {
  let token, ethSwap;

  //A helper that converts the token number to Wei
  function tokens(n) {
    return new web3.utils.toWei(n, 'ether');
  }

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new();
    await token.transfer(ethSwap.address, "1000000000000000000000000");
  })
  
  //Token was deployed correctly
  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      const name = await token.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe("EthSwap deployment", async () => {
    //Token was deployed correctly
    it("contract has a name", async () => {
      const name = await ethSwap.name();
      assert.equal(name, "EthSwap Instant Exchange ");
    });

    //EthSwap has all the tokens
    it("contract has tokens", async () => {
      let balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), "1000000000000000000000000");
    });
  });
});
