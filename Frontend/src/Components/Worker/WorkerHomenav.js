import React,{useState} from 'react'
import {useDispatch} from "react-redux"
import {logout} from "../../Redux/actions/AuthSlice"

import {Link,useNavigate,NavLink} from "react-router-dom"
import { AppBar, Toolbar, Button,Box,Typography,Drawer,Divider,IconButton,Avatar} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu"
import "../../Components/Common/Homenav.css" 


const WorkerHomenav = () => {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
 const logouthandler=()=>{
  dispatch(logout());
  navigate("/login")
 }
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };




  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"white"}
        variant="h5"
        component="div"
      >
        <img src="\images\attachment_117444264-removebg-preview.png" alt="logo" height={"70"} width="100" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeClassName="active" to={"/worker/home"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/worker/profile"}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={"/worker/chatbox"}>chatbox</NavLink>
        </li>
        <li>
          <NavLink to={"/worker/appointments"}>Appointments</NavLink>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
    <Box>
      <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            color={"goldenrod"}
            variant="h6"
            component="div"
            sx={{ display:"flex",marginLeft:"-20px",marginTop:"-10px" }}
          >
            <img src="\images\attachment_117444264-removebg-preview.png" alt="logo" height={"110"} width="110" />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className="navigation-menu">
              <li>
                <NavLink activeClassName="active" to={"/worker/home"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/worker/profile"}>Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/worker/chatbox"}>Chatbox</NavLink>
              </li>
              <li>
                <NavLink to={"/worker/appointments"}>Appointments</NavLink>
              </li>
            </ul>
          </Box>
        <Button onClick={logouthandler} sx={{backgroundColor:"skyblue",color:"white",width:"5rem",height:"1.5rem",display:"flex",justifyContent:"end",marginLeft:"auto","&:hover":{backgroundColor:"deepskyblue"}}}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "150px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box>
        <Toolbar />
      </Box>
    </Box>
  </>
  )
}

export default WorkerHomenav
