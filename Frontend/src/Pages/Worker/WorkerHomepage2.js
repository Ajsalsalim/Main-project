import React from 'react'
import {Navigate} from "react-router-dom"
import WorkerHomenav from '../../Components/Worker/WorkerHomenav'
import WorkerHomebody2 from '../../Components/Worker/WorkerHomebody2'
import Footer from '../../Components/Layout/Footer'

const WorkerHomepage2 = () => {
  return (
    <div>
        <WorkerHomenav/>
        <WorkerHomebody2/>
        <Footer/>
      
    </div>
  )
}

export default WorkerHomepage2
