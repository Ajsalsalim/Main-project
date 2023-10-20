import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector} from 'react-redux';
import {loginSuccess} from "../../Redux/actions/AuthSlice"
import {useGoogleLogin} from '@react-oauth/google';
import { signupGoogle} from "../../Redux/actions/Googleauth";
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import {Radio,FormControl,FormControlLabel,RadioGroup,FormHelperText} from "@mui/material"
import { ToastContainer, toast } from 'react-toastify';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';
import SignUp from "./Signup.module.css"
import 'react-toastify/dist/ReactToastify.css';


const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword,setConfirm]=useState("")
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [selectedvalue,setselectedValue]=useState("");
    const [otpsent,setOtpsent]=useState()
    const [otp,setOtp]=useState("")
    const [loading,setLoading]= useState(false)
    const dispatch = useDispatch();
    const navigate= useNavigate();

    const message = useSelector(state=>state.auth.message);
    console.log(message);
    
  useEffect(() => {
    if (message==="User already exist!"||message==="Worker already exist!") {
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    }
  }, [message]);
  console.log(password);
  console.log(confirmpassword);
 

    function handleGoogleLoginSuccess(tokenResponse) {

      const accessToken = tokenResponse.access_token;

      const userType=selectedvalue;
     
      dispatch(signupGoogle(accessToken,navigate,userType))
    }

      const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
       
      const verifyotp =async(e)=>{
        e.preventDefault();
        if(otp==otpsent){
          await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/signup`,{
            name:name,
            email:email,
            phone:phone,
            password:password,
            selectedvalue:selectedvalue,
            otp:otp
          
        }).then((res)=>{
          if(res.data.customer){
            const {token,id}=res.data
            console.log(token);
            console.log(id);
           dispatch(loginSuccess({token,userType:"customer",id:id}))
            navigate("/user/home")

          }else if(res.data.worker){
            const {token,id}= res.data
            console.log(token);
            console.log(id);
            dispatch(loginSuccess({token,userType:"worker",id:id}))
            navigate("/worker/home")
          }


        })


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
  
    const handlesubmit=async(e)=>{
      e.preventDefault()
      setLoading(true)
      if (!selectedvalue){
        let errorvalidate=true
        if(errorvalidate){
          toast.error("please select a service", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } 
      else{
        if(password!==confirmpassword){
          console.log("hi");
          toast.error("password mismatch", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
  
        }else{
      await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/signup`,{
       name:name,
       email:email,
       phone:phone,
       password:password,
       selectedvalue:selectedvalue
       }).then((res)=>{
        console.log(res);
        if (res.data.message === 'customer already exist' || res.data.message === 'worker already exist') {
          toast.error(res.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }  else if(res.data.message==="OTP sent successfully"){
            console.log(res.data.otp);
            setLoading(false)
             setOtpsent(res.data.otp)
             toast.success("OTP has sent to your gmail", {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });   

          }else if(res.data.message==="Invalid email address"){
            toast.error("Invalid email address", {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });   
          }

       })
       .catch((err)=>{
        console.log(err);
       })
  
      }
    }


    }
  return (
    <>
    {loading?(
       <Stack  spacing={2} sx={{ flex: 1,marginTop:"300px" }}>
       <LinearProgress size="md" />
       <h5>otp is sending</h5>
     </Stack>
    ):(
      <>
    {!otpsent?(
    <form onSubmit={handlesubmit} style={{ maxWidth: 300, margin: 'auto',marginTop:"-25px" }}>
        <img style={{height:"180px"}} src="/images/attachment_117444264-removebg-preview.png"/>
        <h2>SIGNUPFORM</h2>
        <div style={{display:"flex"}}>
       <Link style={{ textDecoration: 'none' }} to="/login">
        <Box
      sx={{
        width: 150,
        height: 50,
        display:"flex",
        backgroundColor: 'white',
        cursor:"pointer",
        alignItems: "center",
        justifyContent: "center",
        
      }}
      ><Typography variant="body1" color="black">LOGIN</Typography>
      </Box>
      </Link>
      <Box
      sx={{
        width: 150,
        height: 50,
        display:"flex",
        backgroundColor: 'skyblue',
        borderRadius:10,
        alignItems: "center",
        justifyContent: "center",
        cursor:"pointer"
        
      }}
      ><Typography variant="body1" color="white">SIGNUP</Typography>
      </Box>
      </div>
      

  
 <TextField

   label="Name"
   type="name"
   value={name}
   onChange={(e) => setName(e.target.value)}
   variant="outlined"
   fullWidth
   margin="normal"
   required
 />
 <TextField
   label="Email"
   type="email"
   value={email}
   onChange={(e) => setEmail(e.target.value)}
   variant="outlined"
   fullWidth
   margin="normal"
   required
 />
  <TextField
   label="Phone"
   type="phone"
   value={phone}
   onChange={(e) => setPhone(e.target.value)}
   variant="outlined"
   fullWidth
   margin="normal"
   required
 />
   <TextField
   label="Password"
   type="password"
   value={password}
   onChange={(e) => setPassword(e.target.value)}
   variant="outlined"
   fullWidth
   margin="normal"
   required
 />
  <TextField
   label="Confirm Password"
   type="password"
   value={confirmpassword}
   onChange={(e) => setConfirm(e.target.value)}
   variant="outlined"
   fullWidth
   margin="normal"
   required
 />
 <FormControl >
      <RadioGroup
        required
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedvalue}
        onChange={(e)=>setselectedValue(e.target.value)}
        >
          
        <FormControlLabel value="customer" control={<Radio/>} label="Customer" />
        <FormControlLabel value="worker" control={<Radio/>} label="Worker" />
     </RadioGroup>
    </FormControl>
 
    
 <Button
    sx={{height:"50px",color:"White",backgroundColor:"black",width:"150px"}} type="submit" variant="contained" color="primary" fullWidth>
   Signup
 </Button>
 <p>Already have account? <Link to="/login"> <Button>Login</Button></Link> </p>

</form>
   ) :(
    <div>
          <img style={{height:"180px"}} src="/images/attachment_117444264-removebg-preview.png"/>

    <Typography variant="body1" color="clack">OTP FORM</Typography>
        
        <Box sx={{display:"flex",alignItems:"center",flexDirection:'column',justifyContent:"center"}}>
            <TextField
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              variant="outlined"
              margin="normal"
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

    )}
    
   {selectedvalue && !otpsent ? (
  <button style={{marginTop:"-15px", height: "60px", width: "300px" }} onClick={login} className={SignUp.googleBTN}>
    <i class="fa-brands fa-google"></i> Sign up with Google
  </button>
) : (
  <p></p>
)}
</>
    )}
   
   
<ToastContainer />
</>

  )

}

export default SignupForm
