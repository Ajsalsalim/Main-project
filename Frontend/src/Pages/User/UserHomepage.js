import React from 'react'
import UserHomenav from '../../Components/User/UserHomenav'
import HomeBanner from '../../Components/Common/HomeBanner';
import HomeBody from '../../Components/Common/HomeBody';
import SearchForm from '../../Components/User/searchform';
import Footer from '../../Components/Layout/Footer';
const UserHomepage = () => {
 
 
 
  return (
    <>
  <UserHomenav/>
  <SearchForm/>
  <HomeBanner/>
  <HomeBody/>
  <Footer/>
  </>
  )
}

export default UserHomepage
