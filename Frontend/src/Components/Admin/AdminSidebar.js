import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from "@mui/material/Button"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AddHomeIcon from '@mui/icons-material/AddHome';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from "../../Redux/actions/AdminauthSlice"


const drawerWidth = 240;

function AdminSidebar(props) {
  const dispatch =useDispatch();
  const navigate=useNavigate();


  const logouthandler=()=>{
    dispatch(logout());
    navigate("/admin")
   }
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <img src="\images\attachment_117444264-removebg-preview.png" alt="logo" height={"110"} width="130" style={{marginTop:"-10px"}} />
      <Toolbar />
  
      <Divider />
      <List>
          <ListItem disablePadding onClick={()=>{navigate("/admin/home")}}>
            <ListItemButton>
              <ListItemIcon>
              <AddHomeIcon/>
             Home
            
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem disablePadding onClick={()=>{navigate("/admin/profession")}} >
            <ListItemButton>
              <ListItemIcon>
              <AddBoxIcon/>
             Add profession
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem disablePadding onClick={()=>{navigate("/admin/banner")}}>
            <ListItemButton>
              <ListItemIcon>
              <AddCircleIcon/>
             Add banner
            
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem disablePadding onClick={()=>{navigate("/admin/userlist")}} >
            <ListItemButton>
              <ListItemIcon>
              < ManageAccountsIcon/>
             Userlist
            
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem disablePadding onClick={()=>{navigate("/admin/workerlist")}} >
            <ListItemButton>
              <ListItemIcon>
              < ManageAccountsIcon/>
             Workerlist
            
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem disablePadding onClick={()=>{navigate("/admin/verifyprofile")}} >
            <ListItemButton>
              <ListItemIcon>
              < VerifiedUserIcon/>
             verifyprofiles
            
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:"black"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography fontFamily="Croissant One " variant="h5" noWrap component="div">
            Job Genie
          </Typography>
          <Button onClick={logouthandler} sx={{backgroundColor:"skyblue",color:"white",width:"70px",height:"30px",display:"flex",justifyContent:"center",marginLeft:"auto","&:hover":{backgroundColor:"deepskyblue"}}}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
  
    </Box>
  );
}

AdminSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminSidebar;
