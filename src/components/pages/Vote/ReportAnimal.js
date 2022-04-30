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

// import Ballot from "../abis/Ballot.json";
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
  const [vote, setvote] = React.useState();
  const [id, setid] = React.useState();
  
  
  
  // const [address, setaddress] = useState();
  const [account, setaccount] = useState();
  const [ballot, setballot] = useState();

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
    // console.log(Ballot);
    const networkData = Ballot.networks[networkId];
    // console.log(networkData)
    if (networkData) {
      // const productCount = await ballot.methods.productCount().call()
      // this.setState({ productCount })
      // // Load products
      // }
      console.log("networkData.address");
      console.log(networkData.address);
      // const ballot = web3.eth.Contract(Ballot.abi, networkData.address);
      const ballotCon = new web3.eth.Contract(Ballot.abi, networkData.address);
      setballot(ballotCon)
      
      // const somedata = await ballot.methods.getData("1").call(account);
      // console.log("somedata", somedata)
      
      setloading(false)
      setAlertStateTrue(false)
    } else {
      window.alert("ballot contract not deployed to detected network.");
    }
  }

  
  const giveVote = async (event) => {
    setloading(true);
    const data = {
      from: account,
      gas: 3000000,
    };
    let voteValue = 0;
    if (vote == "yes"){
      voteValue = 0
    }
    else{
      voteValue = 1
    }
    ballot.methods
      .vote(voteValue, id)
      .send(data)
      .on("transactionHash", (transactionHash) => {
        console.log("Entered function blah");
        setloading(false);
      });
}

  
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
            
            <Avatar variant="rounded"> V</Avatar>
            <Typography component="h1" variant="h5">
              Vote
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {giveVote(e)}}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Id"
                name="name"
                autoFocus
                value={id}
                onChange={(e) => {
                  setid(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="address"
                label="Vote"
                name="address"
                autoFocus
                value={vote}
                onChange={(e) => {
                  setvote(e.target.value);
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
                    Create
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
