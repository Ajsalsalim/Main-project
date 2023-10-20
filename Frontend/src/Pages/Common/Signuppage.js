import React from 'react'
import { Navigate } from 'react-router-dom';
import SignupForm from "../../Components/Common/SignupForm"

const Signuppage = () => {
        const token =localStorage.getItem("token")
        const userType= localStorage.getItem("userType")
        console.log(userType);
        console.log(token);
        if(token&&userType==="customer"){
          console.log("hi");
          return <Navigate to="/user/home"/>;
        }else if(token&&userType==="worker"){
          return <Navigate to="/worker/home"/>;
        }
  return (
   <SignupForm/>
  )
}

export default Signuppage
