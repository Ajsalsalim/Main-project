import React from 'react'
import  { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {logout} from "../../Redux/actions/AdminauthSlice"
import axios from "axios"
import {Navigate,useNavigate} from "react-router-dom"
import ADMINAPI from "../../api/adminapi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Paper, Container, Typography, Avatar, Grid,Button } from '@mui/material'
import Rejectionmodal from './Rejectionmodal';
import Toastify from '../Common/Toastify'



const AdminVerifyprofile = () => {
  
    const [profilelist,setProfilelist]=useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [toastify,setToast] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    useEffect(()=>{

       
           ADMINAPI.get("/admin/profilelist")
           .then((res)=>{
            if(res.data.message==="Token invalid"){
              setToast(true)
              setTimeout(()=>{
                
                dispatch(logout())
                navigate("/admin")
    
              },5000)
               
            }else{
              console.log(res.data);
              setProfilelist(res.data)

            }
      
           }) 
        },[])

        const verifyprofile= async(id)=>{
            
            console.log(id);
           await ADMINAPI.get(`/admin/verifyprofile/${id}`)
            .then((res)=>{
              if(res.data.message==="Token invalid"){
                setToast(true)
                setTimeout(()=>{
                  
                  dispatch(logout())
                  navigate("/admin")
      
                },5000)
              }  
                       
              else if (res.data.message === "profile verified successfully"){
                toast.success(res.data.message, {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              }

              setTimeout(()=>{
                setProfilelist(profilelist.filter(profile => profile._id !== id));
        
              },5000)
            }
          )  
        }

        const  rejectProfileWithReason=async(id,reason)=>{
          console.log(reason);
          await ADMINAPI.get(`/admin/rejectprofile/${id}/${reason}`)
          .then((res)=>{
            if(res.data.message==="Token invalid"){
              setToast(true)
              setTimeout(()=>{
                
                dispatch(logout())
                navigate("/admin")
    
              },5000)
               
            }
           else if(res.data.message === "profile rejected successfully"){
              toast.success(res.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
            setTimeout(()=>{
              setProfilelist(profilelist.filter(profile => profile._id !== id));
      
            },5000)

          })


        }


        
  


  return (
    <>
    <Container maxWidth="lg"sx={{marginTop:"50px",height:"310px"}} >
      {profilelist.length === 0?(
         <Typography sx={{marginTop:"30px"}} variant="h6" gutterBottom>
         No pending profile verifications.
       </Typography>
    ):(
      profilelist.map((profileData) => (
      <Paper sx={{marginTop:"30px",width:"500px"}} elevation={3} key={profileData.id}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>
            Worker Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Avatar
                alt="Profile Picture"
                src={`http://localhost:5000/uploads/${profileData?profileData.profilepicture:""}`}
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography sx={{display:"flex"}} variant="h6">Name: {profileData.name}</Typography>
              <Typography sx={{display:"flex"}}>Gender: {profileData.gender}</Typography>
              <Typography sx={{display:"flex"}}>Location: {profileData.location}</Typography>
              <Typography sx={{display:"flex"}}>Profession: {profileData.profession[0].name}</Typography>
              <Typography sx={{display:"flex"}}>
                Time Preference: {profileData.timepreference}
              </Typography>
              <Typography sx={{display:"flex"}}>Experience: {profileData.profession[0].experience}</Typography>
              <Typography sx={{display:"flex"}}>Description: {profileData.profession[0].description}</Typography>
              <Button sx={{backgroundColor:"skyblue",  color: 'white',"&:hover":{backgroundColor:"deepskyblue"},width:"50px",height:"30px",marginRight:"20px",marginTop:"30px"}} onClick={()=>verifyprofile(profileData._id)} type="submit" variant="contained" >verify</Button>
              <Button sx={{width:"50px",height:"30px",marginTop:"30px"}} onClick={()=>setModalOpen(true)} type="submit" variant="contained" color="error">Reject</Button>
              
              <Rejectionmodal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onReject={(reason) => {
                
                rejectProfileWithReason(profileData._id, reason);
                }}
              />
             
      
            </Grid>
          </Grid>
        </Box>
      </Paper>
    ))
  )}
  </Container>
  <ToastContainer/>
  {toastify?(
        <Toastify/>

      ):(
        null
      )

      }
  </>
  )
}

export default AdminVerifyprofile
