import React,{Fragment,useState} from 'react'
import {Route,Routes} from "react-router-dom"
import UserHomepage from '../Pages/User/UserHomepage'
import UserProfilepage from "../Pages/User/UserProfilepage"
import Appointmentpage from '../Pages/User/Appointmentpage'
import UserProfilepage2 from '../Pages/User/UserProfilepage2'
import LottieAnimation from '../Components/User/animations/LottieAnimation'
import Userchatpage from '../Pages/User/Userchatpage'
import Pagenotfound from '../404notfound/Pagenotfound'
import Profilepage from '../Pages/User/Profilepage'
import Chatboxpage from '../Pages/User/Chatboxpage'
import {Navigate} from "react-router-dom"

const User = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
   
    
    setAnimationComplete(true);
  };
  console.log("hi");
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  
  
 
  return (
    <Fragment>
    <div>
    {!animationComplete ? (
        // Show the LottieAnimation component until animation is complete
        <LottieAnimation onAnimationComplete={handleAnimationComplete} />
      ) : (
     
    <Routes>
    <Route path="/home" element={<UserHomepage/>}/>
    <Route path="/profile" element={<Profilepage/>}/>
    <Route path="/viewprofile/:_id" element={<UserProfilepage/>}/>
    <Route path="/appointments" element={<Appointmentpage/>}/>
    <Route path="/viewprofile2/:_id/:status" element={<UserProfilepage2/>}/>
    <Route path="/chat/:name/:_id" element={<Userchatpage/>}/>
    <Route path="/chatbox" element={<Chatboxpage/>}/>
    <Route path="*" element={<Pagenotfound />} />

    </Routes>
       )}
    </div>
    </Fragment>
  )
}

export default User
