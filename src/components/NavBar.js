import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#552a9a",
    color: "black",
    boxShadow: "0px 0px 0px 0px"
  },
    navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    wrap:"nowrap",
    maxWidth: "100%",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static"  className={classes.header}>
      <CssBaseline />
      <Toolbar >
        <Typography variant="h4" className={classes.logo} style={{color:"white"}}>
          Fr CRCE Funding
        </Typography>
          <div className={classes.navlinks}>

          <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button  href = "/user/home" {...bindTrigger(popupState)} style={{
        color: "white",
        backgroundColor: "#552a9a",
        marginLeft: "10px",
        fontSize: "15px"
    }} >
            Home
          </Button>
          
        </React.Fragment>
      )}
    </PopupState>

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button  {...bindTrigger(popupState)} style={{
        color: "white",
        backgroundColor: "#552a9a",
        marginLeft: "10px",
        fontSize: "15px"
    }}>
        Animal
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={()=>{window.location.href="/user/report"}}>Report Animal</MenuItem>
            <MenuItem onClick={()=>{window.location.href="/user/reportStatus"}}>View Status</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button  {...bindTrigger(popupState)} style={{
        color: "white",
        backgroundColor: "#552a9a",
        marginLeft: "10px",
        fontSize: "15px"
    }}>
            Adoption
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={()=>{window.location.href="/user/adoption"}}>Adoption Request</MenuItem>
            <MenuItem onClick={()=>{window.location.href="/user/adoptionStatus"}}>View Status</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button href='/user/store' {...bindTrigger(popupState)} style={{
        color: "white",
        backgroundColor: "#552a9a",
        marginLeft: "10px",
        fontSize: "15px"
    }}>
            Store
          </Button>
        </React.Fragment>
      )}
    </PopupState>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
        {/* <Avatar sx={{ width: 32, height: 32 }}>{localStorage.getItem('username').substring(0,1).toLocaleUpperCase()}</Avatar> */}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
          </ListItemIcon>
          <Link to ="/user/profile">Profile</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link to='/user/logout'>Logout</Link>
          
        </MenuItem>
      </Menu>

          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;