import React,{useState} from 'react'
import {useDispatch} from "react-redux"
import {logout} from "../../Redux/actions/AuthSlice"
import {NavLink,useNavigate,Link} from "react-router-dom"
import { AppBar, Toolbar, Button,Typography,Box,Divider,Drawer,IconButton } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu"
import "../../Components/Common/Homenav.css" 
import SearchForm from '../User/searchform';


const UserHomenav = () => {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const [professionSearch, setProfessionSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
 const logouthandler=()=>{
  dispatch(logout());
  navigate("/login")
 }
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfessionSearch = (e) => {
    e.preventDefault();
    // Perform search for profession using professionSearch value
    // You can pass this value to your search API or function
    console.log('Search for profession:', professionSearch);
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    // Perform search for location using locationSearch value
    // You can pass this value to your search API or function
    console.log('Search for location:', locationSearch);
  };




  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"white"}
        variant="h5"
        component="div"
      >
        <img src="\images\attachment_117444264-removebg-preview.png" alt="logo" height={"80"} width="120" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeClassName="active" to={"/user/home"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/user/profile"}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={"/user/chatbox"}>chatbox</NavLink>
        </li>
        <li>
          <NavLink to={"/user/appointments"}>Appointments</NavLink>
        </li>
      </ul>
    </Box>
  );



  
  return (
    <>
    <Box>
      <AppBar component={"nav"} sx={{ bgcolor: "black",zIndex:1500,position:"fixed" }}>
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
                <NavLink activeClassName="active" to={"/user/home"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/user/profile"}>Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/user/chatbox"}>Chatbox</NavLink>
              </li>
              <li>
                <NavLink to={"/user/appointments"}>Appointments</NavLink>
              </li>
            </ul>
          </Box>
          
         <Link to="/login" style={{textDecoration:"none",marginLeft:"auto",display:"flex",justifyContent:"end"}}><Button onClick={logouthandler} sx={{backgroundColor:"skyblue",color:"white",width:"5rem",height:"1.5rem",display:"flex",justifyContent:"end",marginLeft:"auto","&:hover":{backgroundColor:"deepskyblue"}}}>Logout</Button></Link>
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

export default UserHomenav
