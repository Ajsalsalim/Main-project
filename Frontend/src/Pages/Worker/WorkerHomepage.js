import React, { useEffect, useState } from 'react'
import WorkerHomenav from '../../Components/Worker/WorkerHomenav'
import WorkerHomebody from '../../Components/Worker/WorkerHomebody';
import Footer from '../../Components/Layout/Footer';



const WorkerHomepage = () => {
  
  return (
    <div>
   
      <>
        <WorkerHomenav />
        <WorkerHomebody />
        <Footer/>
      </>
   
  </div>

  )
}

export default WorkerHomepage
