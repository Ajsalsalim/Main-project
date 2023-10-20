import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio
} from '@mui/material';
import PlacesAutocomplete from 'react-places-autocomplete';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';

const ProfileBody = () => {
  const [loading,setLoading]=useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: '',
        email:"",
        phone:"",
        gender: '',
        location: '',
        timepreference: '',
        availability: false,
        profilepicture: null
      
      });

          const form= new FormData()
      form.append("name",formData.name)
      form.append("email",formData.email)
      form.append("phone",formData.phone)
      form.append("gender",formData.gender)
      form.append("location",formData.location)
      form.append("timepreference",formData.timepreference)
      form.append("availability",formData.availability)
      form.append("profilepicture",formData.profilepicture)
      useEffect(()=>{
         
        const id=localStorage.getItem("id")
        console.log(id);
           API.get(`/workerprofile/${id}`)
           .then((res)=>{
            console.log(res.data);
            if(res.data.message==="Token invalid"){

              dispatch(logout())
              navigate("/login", { state: { isExpired: true } });
      
            }else{
              const profile=res.data.workerprofiledata
            setLoading(false)
            setFormData(profile)

            }
            
           
            
           })
        },[])
    
      const handleInputChange = (event) => {
        console.log(event.target);
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
    
        setFormData((prevData) => ({
          ...prevData,
          profilepicture: imageFile,
        }));
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        API.post("/editworker",form)
        .then((res)=>{
          if(res.data.message==="Token invalid"){
            dispatch(logout())
            navigate("/login", { state: { isExpired: true } });
           
       
          }else{
            toast.success("changes applied", {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }); 
            setTimeout(()=>{
              navigate("/worker/home")

           },5000)

          }
        })

      };


  return (
    <>
    {loading?(
      <p>loading....</p>
    ):(
      <>
    <Container maxWidth="md" sx={{marginTop:"60px"}}>
    <Paper elevation={3}>
 <Box  p={3}>
   <Typography sx={{marginTop:"10px"}} variant="h5" gutterBottom>
     Edit Your Profile
   </Typography>
   <form encType="multipart/form-data"  onSubmit={handleSubmit}>
     <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
         <TextField
           fullWidth
           label="Name"
           name="name"
           value={formData.name}
           onChange={handleInputChange}
         />
       </Grid>
       <Grid sx={{}} item xs={12} sm={6}>
         <TextField
           fullWidth
           label="Email"
           name="email"
           value={formData.email}
           onChange={handleInputChange}
           InputProps={{
             readOnly: true,
           }}
         />
       </Grid>
       <Grid item xs={12} sm={6}>
         <TextField
           fullWidth
           label="Phone"
           name="phone"
           value={formData.phone}
           onChange={handleInputChange}
         />
       </Grid>
       <Grid sx={{marginTop:"-16px"}} item xs={12} sm={6}>
       <TextField
              type="file"
              name="profilepicture"
              accept="image/*"
              onChange={handleImageChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
       </Grid>
    
       <Grid item xs={12} sm={6}>
       < PlacesAutocomplete
            name="location"
            value={formData.location}
            onChange={(value) => handleInputChange({ target: { name: 'location', value } })}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
       <div>
        <div style={{display:"flex"}}>
        < TextField
        label="Location"
          fullWidth
          required
         

          {...getInputProps()}
        />
       
        

        </div>
              <div style={{ maxWidth: '300px', overflowY: 'auto',alignItems:"center",zIndex:500,backgroundColor:"white",position:"absolute" }}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              {...getSuggestionItemProps(suggestion)}
              style={{ cursor: 'pointer', padding: '1px', borderBottom: '1px solid #ddd' }}
              
            >    
              {suggestion.description}
            </div>
          ))}
        </div>
      </div>
    )}
  </PlacesAutocomplete>
       </Grid>
       <Grid sx={{}} item xs={12} sm={6}>
         <TextField
           fullWidth
           label="Profession"
           name="professionname"
           value={formData.profession[0].name}
           onChange={handleInputChange}
           InputProps={{
             readOnly: true,
           }}
         />
       </Grid>
       <Box sx={{backgroundColor:"skyblue",marginTop:"20px",marginLeft:"20px",borderRadius:"8px"}}>
       <Grid sx={{paddingLeft:"5px"}} item xs={12} sm={6}>
       <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={formData.gender}
              value={formData.gender}
              name="gender"
              onChange={(event) => {
               
                handleInputChange(event);
              }}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              
            </RadioGroup>
          </FormControl>
       </Grid>
       </Box>
       <Box sx={{backgroundColor:"skyblue",marginTop:"20px",marginLeft:"20px",borderRadius:"8px"}}>
       <Grid sx={{paddingLeft:"5px"}} item xs={12} sm={6}>
       <FormControl>
            <FormLabel>Timepreference</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={formData.timepreference}
              value={formData.timepreference}
              name="timepreference"
              onChange={(event) => {
               
                handleInputChange(event);
              }}
            >
              <FormControlLabel value="Day" control={<Radio />} label="Day" />
              <FormControlLabel value="Night" control={<Radio />} label="Night" />
              <FormControlLabel value="Both" control={<Radio />} label="Both" />
              
            </RadioGroup>
          </FormControl>
       </Grid>
       </Box>
      
       <Box sx={{backgroundColor:"skyblue",marginTop:"20px",marginLeft:"20px",borderRadius:"8px"}}>
       <Grid sx={{paddingLeft:"5px"}} item xs={12} sm={6}>
       <FormControl>
            <FormLabel>Available</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={formData.availability}
              value={formData.availability}
              name="availability"
              onChange={(event) => {
               
                handleInputChange(event);
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
              
            </RadioGroup>
          </FormControl>
       </Grid>
       </Box>
   
       


       {/* Add similar TextField components for other fields */}
       <Grid item xs={12}>
         <Button
           type="submit"
           variant="contained"
           color="primary"
           sx={{ height: "30px",backgroundColor:"skyblue","&:hover":{backgroundColor:"deepskyblue"}} }
         >
           Save
         </Button>
       </Grid>
     </Grid>
   </form>
   </Box>
   </Paper>
 </Container>
 <ToastContainer/>
 </>



    )}
    </>
   

  )
}

export default ProfileBody
