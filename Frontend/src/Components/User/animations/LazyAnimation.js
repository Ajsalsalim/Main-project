import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../../assets/lottie/Animation - 1697430634077.json"

const LazyAnimation = ({onAnimationComplete}) => {
  return (

           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
      
      <Lottie animationData={animationData} loop={true} onComplete={onAnimationComplete}/>
    </div>
      
    
  )
}

export default LazyAnimation
