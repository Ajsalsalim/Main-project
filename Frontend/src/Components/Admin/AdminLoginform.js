import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import {Navigate} from "react-router-dom"
import Button from '@mui/material/Button';
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import { useDispatch } from 'react-redux';
import {login} from "../../Redux/actions/AdminauthSlice"


const AdminLoginform = () => {
  const [adminname, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const dispatch =useDispatch();

  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/admin/home" />;
  }
  


  const HandleSubmit= async(e)=>{
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/admin/adminlogin`,{
      name:adminname,
      password:password
    }

    ).then((res)=>{
      console.log(res.data.message);
      if(res.data.message==="login succesfull"){
        const token=res.data.token;
        const adminid=res.data.admin._id
        console.log(token);
        console.log(adminid);
        dispatch(login({token:token}))
        navigate("/admin/home")
      }

    })



  }

  return (
    <form onSubmit={HandleSubmit} style={{ maxWidth: 300, margin: 'auto',marginTop:"-10px" }}>
         <img style={{height:"180px"}} src="/images/attachment_117444264-removebg-preview.png"/>
        <h2>ADMIN LOGIN</h2>
        <div style={{display:"flex"}}>
    
     
      </div>
      

  
 <TextField

   label="Username"
   type="name"
   value={adminname}
   onChange={(e) => setName(e.target.value)}
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
 <Button
    sx={{height:"50px",color:"White",backgroundColor:"black",width:"150px"}} type="submit" variant="contained" color="primary" fullWidth>
   Login
 </Button>
</form>
  )
}

export default AdminLoginform
