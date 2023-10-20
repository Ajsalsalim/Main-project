import React from 'react'
import {Navigate} from "react-router-dom"
import WorkerHomenav from '../../Components/Worker/WorkerHomenav'
import Workerchat from '../../Components/Worker/Workerchat'
import Footer from '../../Components/Layout/Footer'

const Workerchatpage = () => {
 
  
  return (
    <div>
        
        <WorkerHomenav/>
        <Workerchat/>
        <Footer/>

      
    </div>
  )
}

export default Workerchatpage
