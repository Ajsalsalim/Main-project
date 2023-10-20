import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import {logout} from "../../Redux/actions/AdminauthSlice"
import {Link, useNavigate,NavLink} from "react-router-dom"
import { AppBar, Toolbar, Button,Divider,IconButton,Box,Typography,Drawer } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu"
import "../../Components/Common/Homenav.css" 

const AdminNav =() => {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logouthandler=()=>{
    dispatch(logout());
    navigate("/admin")
   }


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
          <NavLink activeClassName="active" to={"/admin/home"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admin/userlist"}>Userlist</NavLink>
        </li>
        <li>
          <NavLink to={"/admin/workerlist"}>Workerlist</NavLink>
        </li>
        <li>
          <NavLink to={"/contact"}>verifyprofile</NavLink>
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
              sx={{ display:"flex",marginLeft:"-20px" }}
            >
              <img src="\images\attachment_117444264-removebg-preview.png" alt="logo" height={"80"} width="100" />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink activeClassName="active" to="/admin/home">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/userlist"}>Userlist</NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/workerlist"}>Workerlist</NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/profilelist"}>Verifyprofile</NavLink>
                </li>
              </ul>
            </Box>
           <Button onClick={logouthandler} sx={{backgroundColor:"skyblue",color:"white",width:"5rem",height:"1.5rem",display:"flex",justifyContent:"end",marginLeft:"auto"}}>Logout</Button>
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

export default AdminNav
