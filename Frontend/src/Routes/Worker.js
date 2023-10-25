import React,{Fragment,useState} from 'react'
import {Route,Routes} from "react-router-dom"
import {Navigate} from "react-router-dom"
import WorkerHomepage from '../Pages/Worker/WorkerHomepage'
import WorkerProfilepage from '../Pages/Worker/WorkerProfilepage'
import Appointmentpage from '../Pages/Worker/Appointmentpage'
import LottieAnimation from '../Components/User/animations/LottieAnimation'
import Workerchatpage from '../Pages/Worker/Workerchatpage'
import Chatboxpage from '../Pages/Worker/Chatboxpage'
import Pagenotfound from '../404notfound/Pagenotfound'
const Worker = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
   
    
    setAnimationComplete(true);
  };
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
    <Route path="/home" element={<WorkerHomepage/>}/>
    <Route path="/profile" element={<WorkerProfilepage/>}/>
    <Route path="/chatbox" element={<Chatboxpage/>}/>
    <Route path="/appointments" element={<Appointmentpage/>}/>
    <Route path="/chat/:_id/:name" element={<Workerchatpage/>}/>
    <Route path="*" element={<Pagenotfound />} />

    </Routes>
         )}
    </div>
    </Fragment>
  )
}

export default Worker
