import React from 'react'
import { Suspense, lazy } from "react";
import HomeNav from '../../Components/Common/HomeNav'
import HomeBody from '../../Components/Common/HomeBody'
import HomeBanner from '../../Components/Common/HomeBanner'
const LazyFooter = lazy(() => import('../../Components/Layout/Footer'))

const Homepage = () => {
  return (
    <>
    <HomeNav/>
    <HomeBanner/>
    <HomeBody/>
    <Suspense> 
        <LazyFooter/>
      </Suspense>
    
    </>
   

    
  )
}

export default Homepage
