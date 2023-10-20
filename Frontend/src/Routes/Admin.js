import React,{Fragment} from 'react'
import {Route,Routes,Outlet} from "react-router-dom"
import AdminLoginform from "../Components/Admin/AdminLoginform"
import PrivateRoute from '../Privateroutes/PrivateRoute'
import AdminProfession from '../Components/Admin/AdminProfession'
import AdminLayout from '../Components/Layout/AdminLayout'
import AdminBanner from '../Components/Admin/AdminBanner'
import AdminBody from '../Components/Admin/AdminBody'
import AdminUserbody from '../Components/Admin/AdminUserbody'
import AdminWorkerbody from "../Components/Admin/AdminWorkerbody"
import AdminVerifyprofile from '../Components/Admin/AdminVerifyprofile'
import Pagenotfound from '../404notfound/Pagenotfound'

const Admin = () => {
  
  return (
    
    <div>
       <Routes>
      <Route path="/" element={<AdminLoginform />} />
      <Route element={<PrivateRoute />}>
          <Route path="/home" element={<AdminLayout><AdminBody /></AdminLayout>} />
          <Route path="/profession" element={<AdminLayout><AdminProfession /></AdminLayout>} />
          <Route path="/banner" element={<AdminLayout><AdminBanner/></AdminLayout>} />
          <Route path="/userlist" element={<AdminLayout><AdminUserbody/></AdminLayout>} />
          <Route path="/workerlist" element={<AdminLayout><AdminWorkerbody/></AdminLayout>} />
          <Route path="/verifyprofile" element={<AdminLayout><AdminVerifyprofile/></AdminLayout>} />
          <Route path="*" element={<Pagenotfound />} />
        </Route>
    </Routes>

    </div>
    
  )
}

export default Admin
