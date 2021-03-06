const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

//Importing Chai
var chai = require("chai");
var assert = chai.assert; // Using Assert style

contract("EthSwap", ([deployer, investor]) => {
  let token, ethSwap;

  //A helper that converts the token number to Wei
  function tokens(n) {
    return new web3.utils.toWei(n, "ether");
  }

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, "1000000000000000000000000");
  });

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

  describe("buytokens()", async () => {
    let result;
    before(async () => {
      //Pruchase tokens before each example
      result = await ethSwap.buytokens({
        from: investor,
        value: "1000000000000000000",
      });
    });

    it("Allow users to instantly purchase tokens form ethSwap for a fixed price", async () => {
      //Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), "100000000000000000000");

      //Check EthSwap balance after purchase
      let ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), "999900000000000000000000");

      //Checks if the ETH balance went up
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("1", "Ether"));

      //Checks if the event was emitted with all the correct values
      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), "100000000000000000000");
      assert.equal(event.rate.toString(), "100");
    });
  });

  describe("buytokens()", async () => {
    let result;

    before(async () => {
      //Investor must approve the tokens before the purchase
      await token.approve(ethSwap.address, "100000000000000000000", {
        from: investor,
      });
      //Investor sells tokens
      result = await ethSwap.selltokens("100000000000000000000", {
        from: investor,
      });
    });

    it("Allow users to instantly setll tokens from ethSwap for a fixed price", async () => {
      //Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), "0");

      //Check EthSwap balance after purchase
      let ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), "1000000000000000000000000");

      //Checks if the ETH balance went up
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("0", "Ether"));

      //Checks if the event was emitted with all the correct values
      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), "100000000000000000000");
      assert.equal(event.rate.toString(), "100");

      //FAILUER: investor can't sell more tokens than they have
      //await ethSwap.selltokens('500000000000000000000', {from: investor}).should.be.rejected;
    });
  });
});
