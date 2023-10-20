import React from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import AdminNavbar from '../Admin/AdminNavbar';
import {Box} from "@mui/material"
import AdminFooter from './AdminFooter';

function AdminLayout({ children }) {
  return (
    <div>
        <Box sx={{display:"flex"}}>
        <AdminSidebar/>
      <Box sx={{marginTop:"60px"}}>
        {children}
      </Box>
    

        </Box>
        <AdminFooter/>
      
   
    </div>
  );
}

export default AdminLayout;
