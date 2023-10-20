
import React,{useState} from 'react'
import axios from "axios"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {logout} from "../../Redux/actions/AdminauthSlice"
import API from "../../api/api"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Typography, TextField,Box,Paper } from '@mui/material';
import Toastify from '../Common/Toastify'
const AdminBanner = () => {
    const [bannername,setBannername]=useState("")
    const [toastify,setToast] = useState(false)
    const [selectedimage, setSelectedImage] = useState("");
    const navigate =useNavigate()
    const dispatch = useDispatch()


const handleImageChange = (event) => {
        const imageFile = event.target.files[0];

        setSelectedImage(imageFile);
        console.log(imageFile);
      };
      console.log(selectedimage);

    const handlebannersubmit=async(event)=>{
        event.preventDefault();
        const formData = new FormData();
       formData.append('name', bannername);
       formData.append('image', selectedimage);
       await API.post("/admin/uploadbanner", formData)
         .then((data)=>{
           console.log(data);
           if(data.data.message==="Token invalid"){
            setToast(true)
            setTimeout(()=>{
              
              dispatch(logout())
              navigate("/admin")
  
            },5000)
            
           }else{
            toast.success("Banner added successfully", {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setBannername("");
            setSelectedImage("")

           }
         })

     }
  return (
    <div>
        <Container sx={{marginTop:"50px",height:"310px"}}>
       < Paper sx={{marginTop:"10px"}} elevation={3}>
      <Box p={3}>
      <form encType="multipart/form-data" style={{marginTop:"20px"}} onSubmit={handlebannersubmit} >
      <Typography sx={{textAlign:"left"}} variant="h6" gutterBottom>
           ADD BANNERS
      </Typography>
      <TextField

   label="Name"
   type="name"
   value={bannername}
   onChange={(e) => setBannername(e.target.value)}
   variant="outlined"
   fullWidth
   margin="normal"
   required
 />
    
        <TextField
          type="file"
          name='image'
          accept="image/*"
          onChange={handleImageChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button sx={{backgroundColor:"skyblue","&:hover":{backgroundColor:"deepskyblue"},width:"70px",height:"30px"}} type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
      </Box>
      </Paper>
      </Container>
      <ToastContainer/>
      {toastify?(
        <Toastify/>

      ):(
        null
      )

      }

      
    </div>
  )
}

export default AdminBanner
