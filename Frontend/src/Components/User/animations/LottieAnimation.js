import React from 'react'
import Lottie from "lottie-react"
import animationData from "../../../assets/lottie/opener-loading.json"

const LottieAnimation = ({onAnimationComplete}) => {
    

  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
      
      <Lottie animationData={animationData} loop={false} onComplete={onAnimationComplete}/>
    </div>
  )
}

export default LottieAnimation
