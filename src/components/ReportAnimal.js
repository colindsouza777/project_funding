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
import Navbar from "./NavBar";
// import axios from 'axios';
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { create } from "ipfs-http-client";
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
  let [alertStateTrue, setAlertStateTrue] = React.useState(false);
  let [alertStateFalse, setAlertStateFalse] = React.useState(false);
  let [disasterPhoto, setDisasterPhoto] = React.useState("");
  let [ImgHash, setImgHash] = React.useState("");
  const [personName, setPersonName] = React.useState([]);
  const [imgName, setImgName] = React.useState("");
  const [capturePhoto, setCapturePhoto] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");

  const disImageUpload = async (event) => {
    try {
      const created = await client.add(event);
      setImgHash(created.path);
      console.log(created.path);
      // setImgName(event.target.files[0].name);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const recordId = localStorage.getItem("id_user");
    const name = data.get("name");
    const description = data.get("description");
    const city = data.get("city");
    const state = data.get("state");
    const address = data.get("address");
    const pincode = data.get("pincode");

    // axios.post("http://localhost:5000/animal/api/create",{
    //   recordId:recordId,
    //   name:name,
    //   description:description,
    //   city:city,
    //   state:state,
    //   address:address,
    //   pincode:pincode,
    //   photo:ImgHash,
    // }).then(res => {
    //   window.location.reload()
    // if(res.data.success){
    //   setAlertStateTrue(true);
    //   setTimeout(()=>{
    //     window.location.href = '/user/reportStatus'
    //   })
    // }else{
    //   setAlertStateFalse(true);
    // }
    // })
  };
  const Input = styled("input")({
    display: "none",
  });

  const inputForm = () => {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
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
            <Avatar variant="rounded"> CB</Avatar>
            <Typography component="h1" variant="h5">
              Create Ballot
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                value={state}
                onChange={(e) => {
                  setstate(e.target.value);
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                value={city}
                onChange={(e) => {
                  setcity(e.target.value);
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={address}
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="pincode"
                label="Pincode"
                name="pincode"
                value={pincode}
                onChange={(e) => {
                  setpincode(e.target.value);
                }}
                autoFocus
              />

              <label htmlFor="contained-button-file">
                {/* <Input accept="image/jpeg" id="contained-button-file"  type="file" onChange={disImageUpload}/> */}
                <Button
                  variant="contained"
                  component="label"
                  // onClick={() => {
                  //   setCapturePhoto(true);
                  // }}
                >
                  Photo Upload
                  <input type="file" hidden />
                </Button>
              </label>
              <Button disabled>{imgName != undefined ? imgName : ""}</Button>

              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Report
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

  //   function WebcamComponent(props) {

  //     const videoConstraints = {
  //         width: 800,
  //         height: 700,
  //         facingMode: "user"
  //       };
  //   return (
  //     <Webcam
  //       audio={false}
  //       height={720}
  //       screenshotFormat="image/jpeg"
  //       width={1280}
  //       videoConstraints={videoConstraints}
  //     >
  //       {({ getScreenshot }) => (
  //         <button
  //           onClick={async () => {
  //             const imageSrc = getScreenshot()
  //             console.log(imageSrc)
  //             const blob = await fetch(imageSrc).then((res) => res.blob());
  //             setCapturePhoto(false)
  //             disImageUpload(blob);
  //           }}
  //         >
  //           Capture photo
  //         </button>
  //       )}
  //     </Webcam>
  //   )
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alertStateTrue == true) {
        setAlertStateTrue(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [alertStateTrue]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (alertStateFalse == true) {
        setAlertStateFalse(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [alertStateFalse]);

  return <div>{inputForm()};</div>;
}
