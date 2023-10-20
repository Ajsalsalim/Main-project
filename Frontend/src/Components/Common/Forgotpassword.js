import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { updatecredentials } from '../../Redux/actions/ForgotSlice';
import axios from "axios"
import { Typography,Box,TextField,Button,FormControl,RadioGroup,Radio,FormControlLabel } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpassword = () => {
    const [email,setEmail]=useState("")
    const [selectedvalue,setSelectedvalue]=useState("")
    const [sentotp,setSentotp]=useState()
    const [otp,setOtp]=useState("")
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const sendotp=async(event)=>{
        event.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/forgotpassword`,{
          email:email,
          selectedvalue:selectedvalue
        }).then((res)=>{
          if(res.data.message==="OTP sent successfully"){
            console.log(res.data.otp);
             toast.success("OTP has sent to your gmail", {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }); 
            setSentotp(res.data.otp)


        }else if(res.data.message==="email not found"){
          toast.error(res.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

        }})
           
        
        
    }
    const verifyotp =async(e)=>{
      e.preventDefault();
      if(otp==sentotp){
        console.log(selectedvalue);
      
      
        dispatch(updatecredentials({ email: email, usertype: selectedvalue }));

        navigate("/changepassword")

      }else{
        toast.error("otp does not match", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      }


    }
  return (
    <>

    <img style={{height:"180px"}} src="/images/attachment_117444264-removebg-preview.png"/>
    {sentotp?(
       <div>
       <Typography variant="body1" color="clack">OTP FORM</Typography>
           
           <Box sx={{display:"flex",alignItems:"center",flexDirection:'column',justifyContent:"center"}}>
               <TextField
                 label="OTP "
                 type="text"
                 value={otp}
                 onChange={(e) => setOtp(e.target.value)}
                 variant="outlined"
                 margin="normal"
                 required
               />
             <Button
               variant="contained"
               color="primary"
               style={{ marginTop: '10px' }}
               onClick={verifyotp}
              
             >
               Verify OTP
             </Button>
           </Box>
           </div>


    ):(
      <div>
          

        
      <Typography variant="body1">Enter the registered email here</Typography>
          
        <Box sx={{display:"flex",alignItems:"center",flexDirection:'column',justifyContent:"center"}}>
            <TextField
              label="Email "
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
            />
             <FormControl>
        {/* <FormLabel id="demo-row-radio-buttons-group-label">Login as</FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={selectedvalue}
          onChange={(e)=>setSelectedvalue(e.target.value)}>
          <FormControlLabel value="customer" control={<Radio />} label="Customer" />
          <FormControlLabel value="worker" control={<Radio />} label="Worker" />
  
        </RadioGroup>
      </FormControl>
      {selectedvalue?(
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={sendotp}
            
             
            >
              Send OTP
            </Button>
      ):(null)
  }
          </Box>
         
          </div>

    )
   
}
       <ToastContainer/>
        </>


      
  )
}

export default Forgotpassword
