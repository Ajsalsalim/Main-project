import React,{useState} from 'react';
import {Link} from "react-router-dom"
import { AppBar, Box, Toolbar,Divider, Drawer,IconButton,Typography, Button } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu"
import { NavLink } from 'react-router-dom';
import "../../Components/Common/Homenav.css" 
const HomeNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Link activeClassName="active" to={"/home"}>
            Home
          </Link>
        </li>
        <li>
          <NavLink to={"/menu"}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>Chatbox</NavLink>
        </li>
        <li>
          <NavLink to={"/contact"}>Appointments</NavLink> 
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
                  <NavLink activeClassName="active" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/menu"}>Menu</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Contact</NavLink>
                </li>
              </ul>
            </Box>
           <Link to="/login" style={{textDecoration:"none",marginLeft:"auto",display:"flex",justifyContent:"end"}}><Button sx={{backgroundColor:"skyblue",color:"white",width:"8rem",height:"1.5rem",display:"flex",justifyContent:"end"}}>Login/signup</Button></Link>
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

export default HomeNav
