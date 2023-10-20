import React,{useState,useEffect} from 'react'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom" 
import {Container,Paper,Box,Typography,Grid,TextField,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio,Button,Avatar} from "@mui/material"
import axios from "axios"
import Editprofile from "./Editprofile"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';

const Profile = () => {
  const userid=localStorage.getItem("id")
  const [formData, setFormData] = useState({
    email:"",
    phone:"",
    gender: "",
    address:"",
    profilepicture:null,
  });
  const [selectedValue, setSelectedValue] = useState('female');
  const [profilecreated,setProfilecreated] = useState(false)
  const [profile,setProfile]=useState()
  const [edit,setEdit]=useState(false)
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const form= new FormData()
  form.append("email",formData.email)
  form.append("phone",formData.phone)
  form.append("gender",formData.gender)
  form.append("address",formData.address)
  form.append("profilepicture",formData.profilepicture)

  useEffect(()=>{
    API.get(`/getusercreds?userid=${userid}`)
    .then((res)=>{
      if(res.data.message==="Token invalid"){
        dispatch(logout())
        navigate("/login", { state: { isExpired: true } }); 

      }else{
        console.log(res.data);
       setFormData(res.data)
       const profile=res.data;
       if(profile.isprofilecreated===true){
            setProfilecreated(true)
            setProfile(profile)

       }

      }
      
    })


  },[edit])


  const handleSubmit =(event)=>{
    event.preventDefault();
    console.log(formData);
     API.post("/userprofile",form)
    .then((res)=>{

      if(res.data.message==="Token invalid"){
        dispatch(logout())
        navigate("/login", { state: { isExpired: true } }); 
      }else{
        setProfilecreated(true)
        setProfile(res.data.user)
        toast.success(res.data.message, {
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
  const editprofile = (event)=>{
    event.preventDefault();
    setEdit(true)

  }

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

    console.log(formData);
  };
  return (
    <div>
     
      <Container component="main" maxWidth="md">
        <Paper elevation={3}>
          <Box sx={{marginTop:"60px"}} p={3}>
          {!profilecreated?(
            <>
             <Typography variant="h5" gutterBottom>
             Create Profile
           </Typography>
           <form encType="multipart/form-data"  onSubmit={handleSubmit} >
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
                   // InputLabelProps={{
                   //   shrink: true,
                   // }}
                   
                 />
               </Grid>
               <Grid item xs={12}>
               <FormControl>
               <FormLabel>Gender</FormLabel>
               <RadioGroup
                 row
                 aria-labelledby="demo-radio-buttons-group-label"
                 defaultValue={selectedValue}
                 value={selectedValue}
                 name="gender"
                 onChange={(event) => {
                   setSelectedValue(event.target.value);
                   handleInputChange(event);
                 }}
               >
                 <FormControlLabel value="female" control={<Radio />} label="Female" />
                 <FormControlLabel value="male" control={<Radio />} label="Male" />
                 
               </RadioGroup>
             </FormControl>
             </Grid>
             <Grid item xs={12}>
             
                 <TextField
                   label="Address"
                   name="address"
                   fullWidth
                   variant='outlined'
                   value={formData.address}
                   onChange={handleInputChange}
                   required
                   // InputLabelProps={{
                   //   shrink: true,
                   // }}
                   
                 />
               </Grid>
               <Grid item xs={12}>
               <FormLabel sx={{display:"flex"}}>Profile picture</FormLabel>
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
               <Grid item xs={12}>
                 <Button  sx={{backgroundColor:"skyblue",color:"white",height:"25px",marginTop:"8px","&:hover":{backgroundColor:"deepskyblue"}}} type="submit" variant="contained" color="primary">
                   Create
                 </Button>
               </Grid>
             </Grid>
           </form>
           </>
        
        ):
        (
        <>
        {!edit?(
          <>
          <Typography variant="h5" gutterBottom>
          Profile
       </Typography>
       <Grid sx={{height:"225px"}} container spacing={2}>
         <Grid item xs={12} sm={4}>
           <Avatar
             alt=""
             src={`http://localhost:5000/uploads/${profile.profilepicture}`}
             sx={{ width: 100, height: 100  }}
           />
         </Grid>
         <Grid item xs={12} sm={8}>
           <Typography sx={{display:"flex"}} variant="h6">Name: {profile.name}</Typography>
            <Typography sx={{display:"flex"}}>Email: {profile.email}</Typography>
           <Typography sx={{display:"flex"}}>Phone: {profile.phone}</Typography>
           <Typography sx={{display:"flex"}}>Gender: {profile.gender}</Typography>
           <Typography sx={{display:"flex"}}>Address: {profile.address}</Typography>
           <Button onClick={editprofile} sx={{color:"white",height:"30px",marginTop:"20px",display:"flex",backgroundColor:"skyblue","&:hover":{backgroundColor:"deepskyblue"}}}>EDIT</Button>
          
        
         </Grid>
       </Grid>
       </>

        ):(
          <>
          <Editprofile userid={userid} setEdit={setEdit}/>
          </>
        )
        
        }
        </>)}
         
         

          </Box>
        </Paper>
      </Container>
      <ToastContainer/>
      
    </div>
  )
}

export default Profile
