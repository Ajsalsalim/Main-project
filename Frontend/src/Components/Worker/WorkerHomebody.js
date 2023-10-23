import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import PlaceSearch from './PlaceSearch';
import {Container,Typography,TextField,Button,Box,Paper,Grid} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';

const defaultTimePreferences = ['Day', 'Night', 'Both'];
const WorkerHomebody = ({onPlaceSelect,onAddressChange}) => {
 

  const [professionlist, setProfessionlist] = useState([]);
  const [address, setAddress] = useState('')
  

  const workerid=localStorage.getItem("id")


  const [formData, setFormData] = useState({
    email:"",
    gender: "",
    location: "",
    profession: '',
    timepreference: defaultTimePreferences[0],
    experience:'',
    description:'',
    profilepicture:null,
    availability:'',
  });
  const navigate= useNavigate();
  const dispatch = useDispatch()
  const form= new FormData()
  form.append("email",formData.email)
  form.append("phone",formData.phone)
  form.append("gender",formData.gender)
  form.append("location",formData.location)
  form.append("profession",formData.profession)
  form.append("timepreference",formData.timepreference)
  form.append("experience",formData.experience)
  form.append("description",formData.description)
  form.append("profilepicture",formData.profilepicture)
  form.append("availability",formData.availability)



  
 

 

  useEffect(()=>{
     API.get("/professions")
     .then((res)=>{
      if(res.data.message==="Token invalid"){

        dispatch(logout())
        navigate("/login", { state: { isExpired: true } });

      }else{
        const professionlist=res.data.professionlist
        setProfessionlist(professionlist) 
      }

      
     })
     API.get(`/getcredentials?workerid=${workerid}`)
     .then((res)=>{
      if(res.data.message==="Token invalid"){

        dispatch(logout())
        navigate("/login", { state: { isExpired: true } });

      }else{
        console.log(res.data);
        setFormData(res.data)
      }


     })
  },[])
  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log(formData);
    await API.post("/profilesetup",form)
    .then((res)=>{
      console.log(res);
      const id= res.data.id
      console.log(id);
      if(res.data.message==="Worker profile updated successfully"){
        toast.success("profile added,wait for verification", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });  
        setTimeout(()=>{
       
          navigate("/worker/verifyprofile")
  
        },5000)

      }else{
        dispatch(logout())
        navigate("/login", { state: { isExpired: true } });

      } 

    })
     
  };


  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
   
  };
  const handlePlaceSelect = (selectedLocation) => {
    setAddress(selectedLocation);
    setFormData((prevData) => ({
      ...prevData,
      location: selectedLocation,
    }));
  }
  
  
  const handleProfessionChange = (event, newValue) => {
    
    console.log(newValue);
    console.log(event.target.value);
    const value = newValue !== undefined ? newValue : event.target.value;
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      profession: value,
    }));
    
  };
  

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    console.log(imageFile);

    setFormData((prevData) => ({
      ...prevData,
      profilepicture: imageFile, // Set profilepicture directly in the state
    }));

    console.log(formData);
  };
  


  console.log(address);
  


  return (
    <div style={{marginTop:"30px"}}>
         <Box
      sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width: 300,
      height: 300,
      margin: 'auto', // Center horizontally
        backgroundColor: 'white',
        
      }}
    >
        <img
          src="\images\png-transparent-petroleum-laborer-blue-collar-worker-icon-iron-workers-electronics-hat-service-thumbnail-removebg-preview.png"
      alt="Centered Image"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
   
    </Box>
      <div>
    <Container component="main" maxWidth="md">
      <Paper elevation={3}>
        <Box sx={{marginTop:"10px"}} p={3}>
          <Typography variant="h5" gutterBottom>
            Create Profile
          </Typography>
          <form encType="multipart/form-data"  onSubmit={handleSubmit}>
          
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
            
                <TextField
                  label="Phone"
                  name="phone"
                  fullWidth
                  variant='outlined'
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='gender'
          value={formData.gender}
          label="Gender"
          onChange={handleInputChange}
          sx={{textAlign:"left"}}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
         
        </Select>
      </FormControl>
              </Grid>
           
              <Grid item xs={12}>
              
              <PlaceSearch
              
               
                location={address} dispatch={handlePlaceSelect}

                 />
     
    
              </Grid>
            
              <Grid item xs={12}>
              
        
              <Autocomplete
                freeSolo   
                options={professionlist.map((profession) => profession.name)}
                renderInput={(params) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField {...params} label="Profession" name='profession' required
                    onChange={(event)=>handleProfessionChange(event)}
                    
                    />
                  </div>
                )}
                value={formData.profession}
                onChange={(event, newValue) => handleProfessionChange(event,newValue)} 
              />
    
                </Grid>
              <Grid item xs={12}>
              <TextField
        label="Time preference"
        name="timepreference"
        fullWidth
        select
        value={formData.timepreference}
        onChange={handleInputChange}
        sx={{ textAlign: 'left' }}
        required
      >
        {defaultTimePreferences.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Experience"
                  name="experience"
                  fullWidth
                  rows={4}
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                type="file"
                name="profilepicture"
                accept="image/*"
                onChange={handleImageChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Availability</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="availability"
          value={formData.availability}
          label="Availability"
          onChange={handleInputChange}
          sx={{textAlign:"left"}}
        >
          <MenuItem value={"true"}>True</MenuItem>
          <MenuItem value={"false"}>False</MenuItem>
         
        </Select>
      </FormControl>
                </Grid>
              {/* Add more fields as needed */}
              <Grid item xs={12}>
                <Button  sx={{backgroundColor:"skyblue",color:"white",height:"25px",marginTop:"8px","&:hover":{backgroundColor:"deepskyblue"}}} type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
    <ToastContainer/>
    </div>

    
      
    </div>
  )
}

export default WorkerHomebody
