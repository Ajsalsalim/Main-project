
import React,{useState,useRef} from 'react'
import { useDispatch } from 'react-redux'
import {logout} from "../../Redux/actions/AdminauthSlice"
import {Navigate,useNavigate} from "react-router-dom"
import ADMINAPI from "../../api/adminapi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cropper from "react-cropper";
import ReactCropperElement from "react-cropper"
import "cropperjs/dist/cropper.css";
import { Button, Container, Typography, TextField,Box,Paper } from '@mui/material';
import Toastify from '../Common/Toastify'

const AdminProfession = () => {

    const [selectedimage, setSelectedImage] = useState("");
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [previewImage, setPreviewImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [toastify,setToast] = useState(false)
    const cropperRef = useRef(null);
      const navigate =useNavigate()
    const dispatch = useDispatch()

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        if(imageFile){
          console.log(imageFile);
          setSelectedImage(imageFile);
          const previewImageUrl = URL.createObjectURL(imageFile);
          console.log(previewImageUrl);
          setPreviewImage(previewImageUrl);
         


        }

       
       
      };
      const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        console.log(cropper.getCroppedCanvas());
          const croppedImageUrl = cropper.getCroppedCanvas().toDataURL()
          console.log(croppedImageUrl);
          setCroppedImage(croppedImageUrl);
        
      };

    const handlesubmit=async(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (croppedImage) {
          formData.append('image', croppedImage);
        } else if (selectedimage) {
          formData.append('image', selectedimage);
        }
        formData.append("description",description)
        await ADMINAPI.post("/admin/uploadprofession", formData)
          .then((res)=>{
            console.log(res);
            if(res.data.message==="Token invalid"){
              setToast(true)
              setTimeout(()=>{
            
                dispatch(logout())
                navigate("/admin")
    
              },5000)
            }
            else if(res.data.message==="Profession uploaded successfully"){
              toast.success("Professsion added successfully", {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            
              setName("");
              setDescription("")
              setSelectedImage("")
              setPreviewImage(null);
              setCroppedImage(null);
            }  else if(res.data.message==="Duplicate profession name encountered"){
              toast.error(res.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
          })
        }
  return (
    <div>
       <Container sx={{marginTop:"50px"}}> 
    <Paper elevation={3}>
      <Box  p={3}>
          <form onSubmit={handlesubmit} >
      <Typography sx={{textAlign:"left"}} variant="h6" gutterBottom>
           ADD PROFESSIONS
      </Typography>
      <TextField

   label="Profession Name"
   type="name"
   value={name}
   onChange={(e) => setName(e.target.value)}
   variant="outlined"
   fullWidth
   margin="normal"
   required
 />
  <TextField

label="Description"
type="description"
value={description}
onChange={(e) => setDescription(e.target.value)}
variant="outlined"
fullWidth
margin="normal"
required
/>
    
        <TextField
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          fullWidth
          variant="outlined"
          margin="normal"
          id='image-input'
        />
         <label htmlFor="image-input">
        <Button sx={{backgroundColor:"skyblue","&:hover":{backgroundColor:"deepskyblue"},width:"70px",height:"30px"}} type="submit" variant="contained" color="primary">
          Upload
        </Button>
        </label>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
        <div>
        {previewImage && (
        <div>
          <Typography variant="subtitle1">Preview:</Typography>
          <Cropper
            src={previewImage}
            style={{ height: 300, width: '300px' }}
            aspectRatio={16 / 9}
            guides={false}
            preview=".img-preview"
            ref={cropperRef}
            // autoCrop={true}
          />
          <Button onClick={handleCrop} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Crop
          </Button>
        </div>
      )}
       </div>
       <div>
       {croppedImage && (
        <div>
          <Typography variant="subtitle1">Cropped Image:</Typography>
          <img src={croppedImage} alt="Cropped Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}
      </div>
      </Box>
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

export default AdminProfession
