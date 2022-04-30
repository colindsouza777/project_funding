import React, { Component } from "react";
import Web3 from "web3";

// import Ballot from "../abis/Ballot.json";
import Ballot from "../../../abis/Ballot.json";
// import Marketplace from "../abis/Marketplace.json";
import Navbar from "./Navbar";
import Main from "./Main";

class Vote extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    window.web3 = new Web3(
      new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545")
    );
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // console.log(accounts)
    const networkId = await web3.eth.net.getId();
    // console.log(networkId);
    // console.log(Marketplace);
    // console.log(Ballot);
    const networkData = Ballot.networks[networkId];
    // console.log(networkData)
    if (networkData) {
      // const productCount = await ballot.methods.productCount().call()
      // this.setState({ productCount })
      // // Load products
      // }
      console.log(networkData.address);
      // const ballot = web3.eth.Contract(Ballot.abi, networkData.address);
      const ballot = new web3.eth.Contract(Ballot.abi, networkData.address);
      this.setState({ ballot: ballot });
      // console.log(ballot)
      // const deposits = await ballot.methods
      //   .getData("2")
      //   .call({ from: this.state.account });
      // this.setState({ data: deposits });
      // console.log(this.state.data[0]);
      // console.log(this.state.data[1]);
      // console.log(this.state.data[2]);
      // console.log(parseInt(this.state.data[3]));
      // console.log(parseInt(this.state.data[4]));
      // const balance = await ballot.methods.balance().call();

      // console.log("deposits");
      // console.log(deposits);
      // console.log(web3.fromWei(deposits[3].toNumber(), "ether" ))
      // console.log(web3.toBigNumber(deposits[4]._hex).toFixed())
      // console.log(deposits[4]._hex)
      // const balanceStatus = await this.state.ballot.methods.balance().call();
      // console.log("balance status ",  balanceStatus)
      // console.log(balance);
      // for (var i = 1; i <= productCount; i++) {
      //   const product = await ballot.methods.products(i).call()
      //   this.setState({
      //     products: [...this.state.products, product]
      //   })
      this.setState({ loading: false });
    } else {
      window.alert("ballot contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      ballot: null,
      data: null,
      productCount: 0,
      products: [],
      loading: true,
    };

    this.deposit = this.deposit.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  deposit(address, depositePrice) {
    this.setState({ loading: true });
    const data = {
      from: this.state.account,
      value: depositePrice,
    };
    this.state.ballot.methods
      .deposit(address)
      .send(data)
      .on("transactionHash", async (transactionHash) => {
        this.setState({ loading: false });
      });
  }

  withdraw(vote, id) {
    this.setState({ loading: true });
    const data = {
      from: this.state.account,
      gas: 3000000,
    };
    this.state.ballot.methods
      .vote(vote, id)
      .send(data)
      .on("transactionHash", (transactionHash) => {
        console.log("Entered function blah");
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {/* {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : ( */}
              <Main
                loading={this.state.loading}
                products={this.state.products}
                deposit={this.deposit}
                withdraw={this.withdraw}
                data = {this.state.data}
              />
              
              {/* )} */}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Vote;
