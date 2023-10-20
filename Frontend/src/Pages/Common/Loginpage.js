import React from 'react'
import {Navigate} from "react-router-dom"
import LoginForm from '../../Components/Common/LoginForm'


const Loginpage = () => {
  
      const token =localStorage.getItem("token")
      const userType= localStorage.getItem("userType")
      console.log(userType);
        if(token&&userType==="customer"){
          console.log("hi");
          return <Navigate to="/user/home"/>;
        }else if(token&&userType==="worker"){
          return <Navigate to="/worker/home"/>;
        }

      
  return (
  <LoginForm/>
  )
}

export default Loginpage
