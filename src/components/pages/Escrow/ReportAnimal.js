import * as React from "react";
import jsx from "react/jsx-runtime";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Navbar";
// import axios from 'axios';
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { create } from "ipfs-http-client";
import Web3 from "web3";

// import Escrow from "../abis/Escrow.json";
import Escrow from "../../../abis/Escrow.json";
import Ballot from "../../../abis/Ballot.json";
// import Footer from './Footer';
// import WebcamComponent from './Webcam';
// import Webcam from "react-webcam";

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const client = create("https://ipfs.infura.io:5001/api/v0");

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ReportAnimal() {

  let [loading, setloading] = React.useState(false);
  let [alertStateTrue, setAlertStateTrue] = React.useState(true);
  let [alertStateFalse, setAlertStateFalse] = React.useState(false);
  const [amount, setamount] = React.useState("");
  const [percent, setpercent] = React.useState(0);
  const [data, setdata] = React.useState();
  
  
  
  
  // const [address, setaddress] = useState();
  const [account, setaccount] = useState("");
  const [escrow, setescrow] = useState();
  const [ballot, setballot] = useState();
  const [id, setid] = useState();

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");

  const loadWeb3 = async () => {
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

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setaccount(accounts[0])
    // console.log(accounts)
    const networkId = await web3.eth.net.getId();
    // console.log(networkId);
    // console.log(Marketplace);
    // console.log(Escrow);
    const networkData = Escrow.networks[networkId];
    const networkData2 = Ballot.networks[networkId];
    // console.log(networkData)
    if (networkData) {
      // const productCount = await escrow.methods.productCount().call()
      // this.setState({ productCount })
      // // Load products
      // }
      console.log("networkData.address");
      console.log(networkData.address);
      // const escrow = web3.eth.Contract(Escrow.abi, networkData.address);
      const escrowCon = new web3.eth.Contract(Escrow.abi, networkData.address);
      setescrow(escrowCon)
      const ballotCon = new web3.eth.Contract(Ballot.abi, networkData.address);
      setballot(ballotCon)
    //   const result = await ballotCon.methods.voteResults("1").call(account);
    // console.log(result)
      // const somedata = await escrow.methods.getData("1").call(account);
      // console.log("somedata", somedata)
      
      setloading(false)
      setAlertStateTrue(false)
    } else {
      window.alert("escrow contract not deployed to detected network.");
    }
  }

  
  const deposit = async (e) => {
    e.preventDefault()
    setloading(true);
    const price = window.web3.utils.toWei(amount.toString(), 'Ether')
    const data = {
      from: account,
      value: price
    }
    
    escrow.methods
      .deposit(address)
      .send(data)
      .on("transactionHash", async (transactionHash) => {
        setloading(false);
      });
  }

  const withdraw = (e) => {
    e.preventDefault()
    setloading(true);
    const data = {from: account};
    escrow.methods
      .withdraw(address, percent)
      .send(data)
      .on("transactionHash", (transactionHash) => {
        console.log("Entered function blah");
        setloading(false);
      });
  }

  // const getData = async (id) => {
  //   console.log(id)
  //   const result = await ballot.methods.voteResults(id + "");
  //   console.log(result)
  // }

  
  const Input = styled("input")({
    display: "none",
  });

  const inputForm = () => {
    return (
      <ThemeProvider theme={theme}>
        <Navbar account = {account}/>
        {alertStateTrue && (
          <Alert
            severity="success"
            sx={{
              marginTop: "20px",
              width: "200px",
              marginLeft: "20px",
            }}
          >
            {"Success"}
          </Alert>
        )}
        {alertStateFalse && (
          <Alert
            severity="error"
            sx={{
              marginTop: "20px",
              width: "200px",
              marginLeft: "20px",
            }}
          >
            {"Something Went Wrong"}
          </Alert>
        )}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
                margin="normal"
                fullWidth
                id="status"
                label="Id"
                name="status"
                autoFocus
                value={id}
                onChange={(e) => {
                  
                  // getData(e.target.value);
                }}
              />
              <Button disabled>{data}</Button>
            <Avatar variant="rounded"> W</Avatar>
            <Typography component="h1" variant="h5">
              Deposit
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {deposit(e)}}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoFocus
                value={address}
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
                autoFocus
                value={amount}
                onChange={(e) => {
                  setamount(e.target.value);
                }}
              />
              

              

              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr:50 }}
                  >
                    Deposit
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Avatar variant="rounded"> W</Avatar>
            <Typography component="h1" variant="h5">
              Withdraw
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {withdraw(e)}}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="vote"
                label="Address"
                name="vote"
                autoFocus
                value={address}
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="percent"
                label="Percent"
                name="percent"
                autoFocus
                value={percent}
                onChange={(e) => {
                  setpercent(e.target.value);
                }}
              />
              

              

              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr:50 }}
                  >
                    Withdraw
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        {/* <Footer/> */}
      </ThemeProvider>
    );
  };

  useEffect(async () => {
    console.log(alertStateTrue)
    if(alertStateTrue){
      await loadWeb3();
      await loadBlockchainData();
      
    }
  }, []);

  return <div>{loading == true ? "Loading..." : inputForm()};</div>;
}
