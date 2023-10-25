import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoading,stopLoading,selectLoading } from '../../Redux/actions/LoadingSlice';
import axios from "axios"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/joy/LinearProgress';
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';
import { Box, Paper, Container, Typography, Avatar, Grid,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';


const WorkerHomebody2 = () => {
  const [profileData,setProfiledata]=useState()
  const [spinloading,setSpinloading]=useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);
  
  
useEffect(()=>{
  dispatch(startLoading());
const id=localStorage.getItem("id")
console.log(id);
   API.get(`/workerprofile/${id}`)
   .then((res)=>{
    console.log(res.data);
    if(res.data.message==="Token invalid"){

      dispatch(logout())
      navigate("/login", { state: { isExpired: true } });

    }else{
      setSpinloading(false)
      const profile=res.data 
    if(profile.workerprofiledata.isverified==="rejected"){
      setProfiledata(null)
    }else if(profile.workerprofiledata.isverified==="pending") {
      setProfiledata(profile.workerprofiledata)

    }else if(profile.workerprofiledata.isverified==="verified"){
      setProfiledata(profile.workerprofiledata)
    }
    dispatch(stopLoading());
    }

   })
},[dispatch])
const { value } = useCountUp({
  isCounting: true,
  duration: 5,
  easing: 'linear',
  start: 0,
  end: 75,
  onComplete: () => ({
    shouldRepeat: true,
    delay: 2,
  }),
});


  return (
    <>
      {spinloading?(
        <CircularProgress sx={{marginTop:"200px"}} variant="outlined" />

      ):(
        <Container maxWidth="md" sx={{marginTop:"60px"}}>
        <Paper elevation={3}>
          <Box p={3}>
            <Typography variant="h5" gutterBottom>
              Worker Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Avatar
                  alt=""
                  src={`${process.env.REACT_APP_API_SERVER_URL}/uploads/${profileData?profileData.profilepicture:""}`}
                  sx={{ width: 100, height: 100  }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography sx={{display:"flex"}} variant="h6">Name: {profileData?profileData.name:""}</Typography>
                 <Typography sx={{display:"flex"}}>Gender: {profileData?profileData.gender:""}</Typography>
                <Typography sx={{display:"flex"}}>Location: {profileData?profileData.location:""}</Typography>
                <Typography sx={{display:"flex"}}>Profession: {profileData?profileData.profession[0].name:""}</Typography>
                <Typography sx={{display:"flex"}}>Time Preference: {profileData?profileData.timepreference:""}</Typography>
                <Typography sx={{display:"flex"}}>Experience: {profileData?profileData.profession[0].experience:""}</Typography>
                <Typography sx={{display:"flex"}}>Description: {profileData?profileData.profession[0].description:""}</Typography>
             
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        <>
        <Stack sx={{ width: '100%' }} spacing={2}>
        {isLoading ? (
    <LinearProgress
    determinate
    variant="outlined"
    color="neutral"
    size="sm"
    thickness={24}
    value={Number(value)}
    sx={{
      '--LinearProgress-radius': '20px',
      '--LinearProgress-thickness': '24px',
    }}
  >
    <Typography
      level="body-xs"
      fontWeight="xl"
      textColor="common.white"
      sx={{ mixBlendMode: 'difference' }}
    >
      LOADING… {`${Math.round(Number(value))}%`}
    </Typography>
  </LinearProgress>
  ) : profileData && profileData.isverified === "pending" ? (
    <Alert severity="info">Please wait for verification; it may take up to 2 days.</Alert>
  ) : !profileData? (
    <>
    <Alert severity="error">Your profile has been rejected.please try again</Alert>
    <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={()=>navigate("/worker/home")}
          sx={{ height: "40px", display: "flex" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </div>
      </>
  ) : (
    <>
      <Alert severity="success">Your profile is verified by admin.</Alert>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={()=>navigate("/worker/profile")}
          sx={{  height: "30px", display: "flex",backgroundColor:"skyblue","&:hover":{backgroundColor:"deepskyblue"}} }
          type="submit"
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      </div>
    </>
  )}
      </Stack>
    </>
      
      </Container>

      )}
      </>
    
    
   
  )
}

export default WorkerHomebody2
