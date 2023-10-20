import React,{Fragment} from 'react'
import {Route,Routes} from "react-router-dom"
import Homepage from '../Pages/Common/Homepage'
import Loginpage from '../Pages/Common/Loginpage'
import Signuppage from '../Pages/Common/Signuppage'
import Forgotpassword from '../Components/Common/Forgotpassword'
import Changepassword from '../Components/Common/Changepassword'
import Pagenotfound from '../404notfound/Pagenotfound'

const Common = () => {
  return (
    <Fragment>
    <div>
        <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<Signuppage/>}/>
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
        <Route path="/changepassword" element={<Changepassword/>}/>
        <Route path="*" element={<Pagenotfound />} />
        </Routes> 
    </div>
    </Fragment>
  )
}

export default Common
