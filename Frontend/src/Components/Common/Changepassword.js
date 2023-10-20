import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const Changepassword = () => {
    const [password,setPassword]= useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    const email = useSelector((state) => state.forgot.email);
    const usertype = useSelector((state) => state.forgot.usertype);
    const navigate=useNavigate();

    const updatepassword =async(event)=>{
        event.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/changepassword`,{
            email:email,
            password:password,
            usertype:usertype
        }).then((res)=>{
            console.log(res.data.message);
            toast.success(res.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setTimeout(() => {
                navigate('/login');
              }, 5000);  
           




        })

    }






  return (
    <>
    
    <div>
              <Typography variant="body1">Enter the Newpassword</Typography>
          
          <Box sx={{display:"flex",alignItems:"center",flexDirection:'column',justifyContent:"center"}}>
              <TextField
                label="Newpassword "
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                required
              />
                <TextField
                label="Confirmpassword "
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                variant="outlined"
                margin="normal"
                required
              />
              <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={updatepassword}
            
             
            >
              Change password
            </Button>
               </Box>
               


      
    </div>
     <ToastContainer/>
     </>
  )
}

export default Changepassword
