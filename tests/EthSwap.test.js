const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

//Configuring chai
var chai = require("chai");
var assert = chai.assert; // Using Assert style
var expect = chai.expect; // Using Expect style
var should = chai.should(); // Using Should style

contract("EthSwap", (accounts) => {
  //Token was deployed correctly
  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      let token = await Token.new();
      const name = await Token.name();
      assert.equal(name, "DApp Token ");
    });
  });

  describe("EthSwap deployment", async () => {
    //Token was deployed correctly
    it("contract has a name", async () => {
      let ethSwap = await EthSwap.new();
      const name = await ethSwap.name();
      assert.equal(name, "EthSwap Instant Exchange ");
    });

    //EthSwap has all the tokens
    it("contract has tokens", async () => {
      let token = await Token.new();
      let ethSwap = await EthSwap.new();
      await token.transfer(ethSwap.address, "1000000000000000000000000");
      let balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), "1000000000000000000000000");
    });
  });
});
