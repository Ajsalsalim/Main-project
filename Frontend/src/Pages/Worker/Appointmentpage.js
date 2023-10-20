import React from 'react'
import {Navigate} from "react-router-dom"
import Appointment from '../../Components/Worker/Appointment'
import WorkerHomenav from '../../Components/Worker/WorkerHomenav'
import Footer from '../../Components/Layout/Footer'

const Appointmentpage = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
        <WorkerHomenav/>
        <Appointment/>
        <Footer/>
        

      
    </div>
  )
}

export default Appointmentpage
