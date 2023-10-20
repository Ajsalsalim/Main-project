import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {Typography,Grid,TextField,Button,FormControl,FormControlLabel,FormLabel,RadioGroup,Radio,Box} from "@mui/material"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';


const Editprofile = ({userid,setEdit}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
    const [formData, setFormdata] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
        profilepicture:null
      });
      const form= new FormData()
      form.append("name",formData.name)
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
            setFormdata(res.data)
          }
          

    })
        },[])

        const handleInputChange = (event) => {
            console.log(event.target);
            const { name, value } = event.target;
            setFormdata((prevData) => ({
              ...prevData,
              [name]: value,
            }));
           
          };
          const handleImageChange = (event) => {
            const imageFile = event.target.files[0];
            console.log(imageFile);
        
            setFormdata((prevData) => ({
              ...prevData,
              profilepicture: imageFile,
            }));
        
            console.log(formData);
          };

          const handleSubmit = (event)=>{
            event.preventDefault()
            console.log("helo");
            API.post(`/edituser?userid=${userid}`,form)
            .then((res)=>{
                console.log(res.data)
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
                  setEdit(false)

                }
               
            })


          }


  return (
  <>
      <Typography sx={{marginTop:"10px"}} variant="h5" gutterBottom>
        Edit Your Profile
      </Typography>
      <form  encType="multipart/form-data"  onSubmit={handleSubmit}>
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
          <Box sx={{backgroundColor:"skyblue",marginTop:"20px",marginLeft:"20px",borderRadius:"8px"}}>
          <Grid sx={{marginLeft:"5px"}}  item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          
         
      
          


          {/* Add similar TextField components for other fields */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "150px", height: "30px",backgroundColor:"skyblue","&:hover":{backgroundColor:"deepskyblue"}} }
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer/>
      </>
    
  )

}

export default Editprofile
