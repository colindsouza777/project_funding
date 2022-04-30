import React, { Component } from "react";
import Web3 from "web3";

// import Ballot from "../abis/Ballot.json";
import Ballot from "../../../abis/Ballot.json";
// import Marketplace from "../abis/Marketplace.json";
import { create } from "ipfs-http-client";
import Navbar from "./Navbar";
// import Main from "../Vote/Main";

const client = create("https://ipfs.infura.io:5001/api/v0");

class CreateBallot extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async getImageHash(e) {
    e.preventDefault();
    console.log(e.target);
    try {
      const created = await client.add(this.state.image);
      this.setState({ imgHash: created.path });
      console.log(created.path);
    } catch (error) {
      console.log(error.message);
    }
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
    // window.web3 = new Web3(
    //   new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545")
    // );
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
      //   const deposits = await ballot.methods.payment().call({from: this.state.account});
      // const balance = await ballot.methods.balance().call();
      const somedata = await ballot.methods.getData("2").call({from: this.state.account});
      console.log("somedata", somedata)
      //   console.log("deposits");
      //   console.log(deposits);
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
      imgHash: "",
      image: null,
      proposalName:"",
      voteAddress:"",
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

  withdraw(address, percent) {
    this.setState({ loading: true });
    const data = { from: this.state.account };
    this.state.ballot.methods
      .withdraw(address, percent)
      .send(data)
      .on("transactionHash", (transactionHash) => {
        console.log("Entered function blah");
        this.setState({ loading: false });
      });
  }

  async createProposal(event){
    console.log("1", this.state.proposalName, this.state.imgHash);
    console.log(this.state.account)
      event.preventDefault()
      // return
    //   const somedata = await this.state.ballot.methods.getData("1").call({from: this.state.account});
    // const newId = (Number(somedata[0]) + 1) + "" 
    this.setState({ loading: true });
    const data = {
      from: this.state.account,
      gas:3000000
    };
    this.state.ballot.methods
      .addProposal("2", this.state.proposalName, this.state.imgHash)  //this.state.proposalName
      .send(data)
      .on("transactionHash", async (transactionHash) => {
        this.setState({ loading: false });
        console.log("blah function working")
      });
  }

  async giveVoteRight(event){
    event.preventDefault()
  this.setState({ loading: true });
  const data = {
    from: this.state.account,
    gas:2000000
  };
  this.state.ballot.methods
    .giveRightToVote(""+ this.voteAddress.value)  //this.state.proposalName
    .send(data)
    .on("transactionHash", async (transactionHash) => {
      this.setState({ loading: false });
      console.log("You have the right to remain silent")
    });
}

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              <div id="content">
                <h1>Create Proposal</h1>
                <form
                  onSubmit={(e) => {
                    this.getImageHash(e);
                  }}
                >
                  <input
                    id="productPrice"
                    type="file"
                    className="form-control"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      this.setState({ image: e.target.files[0] });
                    }}
                    placeholder="Upload"
                    required
                  />
                  <input type={"submit"} value={"Get hash"} />
                </form>
                <form
                  onSubmit={(event) => {
                    this.createProposal(event);
                  }}
                >
                  <div className="form-group mr-sm-2">
                    <input
                      id="productName"
                      type="text"
                      ref={(input) => {
                        // this.state.proposalName = input;
                        // this.setState({proposalName: input})
                      }}
                      onChange={(e) => {this.setState({proposalName: e.target.value})}}
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="form-group mr-sm-2"></div>
                  <button type="submit" className="btn btn-primary">
                    Deposit
                  </button>
                </form>
                <h1>Give right to vote</h1>
                <form
                  onSubmit={(event) => {
                    this.giveVoteRight(event);
                  }}
                >
                  <div className="form-group mr-sm-2">
                    <input
                      id="productName"
                      type="text"
                      ref={(input) => {
                        this.voteAddress = input;
                      }}
                      className="form-control"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="form-group mr-sm-2"></div>
                  <button type="submit" className="btn btn-primary">
                    Give Right
                  </button>
                </form>
              </div>
              );
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBallot;
