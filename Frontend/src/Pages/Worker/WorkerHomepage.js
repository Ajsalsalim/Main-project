import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useDispatch} from "react-redux"
import WorkerHomenav from '../../Components/Worker/WorkerHomenav'
import {useNavigate} from "react-router-dom";
import WorkerHomebody from '../../Components/Worker/WorkerHomebody';
import Footer from '../../Components/Layout/Footer';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';


const WorkerHomepage = () => {
  
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate();
  const dispatch = useDispatch();
    const id = localStorage.getItem("id")

  
    
    useEffect(()=>{
      API.get(`/workerprofile/${id}`)
      .then((res)=>{
        console.log(res.data);
        if(res.data.message==="Token invalid"){

          dispatch(logout())
          navigate("/login", { state: { isExpired: true } });
  
        }
        else if(res.data.workerprofiledata.isprofilecreated===true){
          navigate("/worker/verifyprofile")
        }else{
          setLoading(false)
        }

      })


    },[])
    
  return (
    <div>
    {loading ? null : (
      <>
        <WorkerHomenav />
        <WorkerHomebody />
        <Footer/>
      </>
    )}
  </div>

  )
}

export default WorkerHomepage
