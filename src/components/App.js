import React, { Component } from "react";
import "./App.css";

class App extends Component {
  async componentWillMount() {
    //Detecting if the browser is running metamask
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }

    //Loading blckchain data
    this.loadBlockChainData();
  }

  async loadBlockChainData() {
    //Fetching accounts using the new ethereum api, instead of web3
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    //Setting the account state to the first account in the array
    this.setState({ account: accounts[0] });
    console.log(this.state.account);

    //Fecthing the balance for any givern account
    const ethBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    });
    this.setState({ ethBalance });
    console.log(this.state.ethBalance);
  }

  constructor(props) {
    super(props);
    //decalring states the og way
    this.state = {
      account: "",
      ethBalance: "",
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>pedrao</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
