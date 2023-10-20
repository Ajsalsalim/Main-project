import React,{useState,useEffect} from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import {Link,useNavigate,useLocation} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux';
import {signinGoogle} from "../../Redux/actions/Googleauth";
import {loginSuccess,removemessage} from "../../Redux/actions/AuthSlice"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import {Radio,FormControl,FormControlLabel,RadioGroup,Alert} from "@mui/material"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import LoginStyles from './Login.module.css'


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedvalue,setselectedValue]=useState("");
    const navigate= useNavigate();
    const dispatch=useDispatch();
    const location = useLocation(); 

    const message = useSelector(state=>state.auth.message);
    console.log(message);
    const isExpired = location.state?.isExpired || false;

    useEffect(() => {
      if (message==="User doesn't exist!"||message==="Worker doesn't exist!") {
        console.log("hi");
        toast.error(message+"please signup", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        dispatch(removemessage())
  
      }else if(message==="customer is blocked by admin"||message==="worker is blocked by admin"){
        toast.error(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        dispatch(removemessage())

      }
    },[dispatch,message]);

    function handleGoogleLoginSuccess(tokenResponse) {

      const accessToken = tokenResponse.access_token;
      const userType = selectedvalue

      dispatch(signinGoogle(accessToken,navigate,userType))
  }
  const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

   

    const handlesubmit=async(e)=>{
      e.preventDefault()
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
      }else{
        await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/login`,{
          email:email,
          password:password,
          selectedvalue:selectedvalue
        }

        ).then((res)=>{
          if(res.data.message==="worker not found. signup please"||res.data.message==="customer not found. signup please"){
            toast.error(res.data.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

          }
          else if(res.data.message==="Invalid Email/password"){
            toast.error(res.data.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
            else{
            if(res.data.customer){
               const {token,id}=res.data
               console.log(id);
              dispatch(loginSuccess({token,userType:"customer",id:id}))
              navigate("/user/home")

            }else if(res.data.worker){
              const {token,id}= res.data
              console.log(id);
              dispatch(loginSuccess({token,userType:"worker",id:id}))
              navigate("/worker/home") 
            }
            
          }
               
        })

        
      }



    }
  return (
    <>
    <form onSubmit={handlesubmit} style={{ maxWidth: 300, margin: 'auto',marginTop:"-10px" }}>
         <img style={{height:"180px"}} src="/images/attachment_117444264-removebg-preview.png"/>
         {isExpired?(
        <Alert sx={{marginTop:"-20px"}} severity="error">Your token is expired, Login again</Alert>
      ):(
        null

      )}
        <h2>LOGINFORM</h2>
        <div style={{display:"flex"}}>
        <Box
      sx={{
        width: 150,
        height: 50,
        display:"flex",
        backgroundColor: 'skyblue',
        borderRadius:10,
        alignItems: "center",
        justifyContent: "center"
        
      }}
      >
       
        <Typography variant="body1" color="white">LOGIN</Typography>
      </Box>
      <Link style={{textDecoration:"none"}} to="/signup">
      <Box
      sx={{
        width: 150,
        height: 50,
        display:"flex",
        backgroundColor: 'white',
        cursor:"pointer",
        alignItems: "center",
        justifyContent: "center"
        
      }}
      ><Typography variant="body1" color="black">SIGNUP</Typography>
      </Box>
      </Link>
      </div>
      

  
 <TextField

   label="Email"
   type="email"
   onChange={(e) => setEmail(e.target.value)}
   variant="outlined"
   fullWidth
   margin="normal"
   required
 />
 <TextField
   label="Password"
   type="password"
   onChange={(e) => setPassword(e.target.value)}
   variant="outlined"
   fullWidth
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
        onChange={(e)=>setselectedValue(e.target.value)}>
        <FormControlLabel value="customer" control={<Radio />} label="Customer" />
        <FormControlLabel value="worker" control={<Radio />} label="Worker" />

      </RadioGroup>
    </FormControl>
   <Link to="/forgotpassword" style={{textDecorationLine:"none"}}> <p style={{marginLeft:"-180px",marginTop:"-5px"}}>Forgot password?</p></Link>
 <Button
    sx={{height:"50px",color:"White",backgroundColor:"black",width:"150px"}} type="submit" variant="contained" color="primary" fullWidth>
   Login
 </Button>
 <p>Not a member? <Link to="/signup"> <Button>Signup now</Button></Link> </p>
</form>
{selectedvalue?(
<button onClick={() => login()}  className={LoginStyles.googleBTN}>
                    <i class="fa-brands fa-google"></i>  Login with google</button>
):(
  <p>choose customer or worker,then enable google Login
  </p>
)}
<ToastContainer />
                

</>




   
  )
}

export default LoginForm
