import React, { useEffect,useState } from 'react'
import axios from "axios"
import WorkerHomenav from '../../Components/Worker/WorkerHomenav'
import ProfileBody from '../../Components/Worker/ProfileBody'
import CircularProgress from '@mui/joy/CircularProgress';
import { Navigate,useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import Footer from '../../Components/Layout/Footer'
import API from '../../api/api'
import { logout } from '../../Redux/actions/AuthSlice'

const WorkerProfilepage = () => {
  const [loading,setLoading]=useState(true)
    const navigate=useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        const id=localStorage.getItem("id")
        API.get(`/workerprofile/${id}`)
        .then((res)=>{
          if(res.data.message==="Token invalid"){

            dispatch(logout())
            navigate("/login", { state: { isExpired: true } });
    
          }else{
            console.log(res.data);
         const profile=res.data.workerprofiledata
         console.log(profile.isverified);
         if(profile.isverified==="verified"){
           setLoading(false)
         }else{
         
            navigate("/worker/home")
         }

          }
         
      

        })
    },[])
  
  return (
    <div>
    {loading ? (
      <>
       <CircularProgress sx={{marginTop:"200px"}} variant="outlined" />
      </>
    )
     : (
      <>
        <WorkerHomenav />
        <ProfileBody />
        <Footer/>
      </>
    )}
  </div>
  )
}

export default WorkerProfilepage
