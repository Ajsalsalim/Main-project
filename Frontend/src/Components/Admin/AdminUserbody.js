import * as React from 'react';
import ADMINAPI from "../../api/adminapi"
import {logout} from "../../Redux/actions/AdminauthSlice"
import { useEffect,useState } from 'react';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import axios from "axios"
import Button from "@mui/material/Button"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Common/Toastify';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const AdminUserbody = () => {

  const [userlist,setUserlist]=useState([])
  const [updateComponent, setUpdateComponent] = useState(false);
  const [toastify,setToast] = useState(false)
  const navigate =useNavigate();
  const dispatch = useDispatch();
  


      useEffect(()=>{
        try{
            ADMINAPI.get("/admin/getusers")            
            
           .then((res)=>{
           
            if(res.data.message==="Token invalid"){

              setToast(true)
              setTimeout(()=>{
                
                dispatch(logout())
                navigate("/admin")

              },5000)
              
            }else{
              const userlist=res.data.userlist;
            setUserlist(userlist)

            }
            

           })    

        }catch(err){

        }  
      },[navigate,updateComponent])
      const updateUserStatus = (userId, isBlocked) => {
        setUserlist((prevUserlist) =>
          prevUserlist.map((user) =>
            user._id === userId ? { ...user, isBlocked } : user
          )
        );
      };
    
      const handleActionUser = (userId,userblocked) => {
        if(!userblocked){
          ADMINAPI.post(`/admin/blockuser/${userId}`)
          .then((res) => {
            if(res.data.message==="Token invalid"){

              setToast(true)
              setTimeout(()=>{
                
                dispatch(logout())
                navigate("/admin")

              },5000)
            }
              else{
                toast.success(res.data.message, {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              updateUserStatus(userId, true);
              setUpdateComponent(!updateComponent);
            }
                
              })
             
          .catch((error) => {
           
            console.error('Error blocking user', error);
          }) 

        }else{
          ADMINAPI.post(`/admin/unblockuser/${userId}`)
          .then((res)=>{
            if(res.data.message==="Token invalid"){

              setToast(true)
              setTimeout(()=>{
                
                dispatch(logout())
                navigate("/admin")

              },5000)
            }else{
              toast.success(res.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            updateUserStatus(userId, false);
            setUpdateComponent(!updateComponent);
            }

            })   
          .catch((error) => {
            console.error('Error unblocking user', error);
          }) 

        }
         
        
      
        
      };

  return (
    <>
    <TableContainer sx={{marginTop:"50px",marginLeft:"20px"}}  component={Paper} elevation={3} p={3}>  
      
    

    <Table sx={{}} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Profilecreated</TableCell>
          <TableCell>Action</TableCell>

          
        </TableRow>
      </TableHead>
      <TableBody>
        {userlist.map((item) => (
          <TableRow
            key={item.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
           
            <TableCell >{item.phone}</TableCell>
            <TableCell >{item.email}</TableCell>
            <TableCell >{item.gender}</TableCell>
            <TableCell >{item.address}</TableCell>
            <TableCell >{item.isprofilecreated}</TableCell>
            <TableCell><Button sx={{width:"70px",height:"30px"}} type='submit' variant="contained"  color={item.isblocked ? 'error' : 'success'}   onClick={() => handleActionUser(item._id,item.isblocked)}>  {item.isblocked ? 'Unblock' : 'Block'}</Button></TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  
  </TableContainer>
  <TableContainer/>
  <ToastContainer/>
  {toastify?(
        <Toastify/>

      ):(
        null
      )

      }
  </>
  )
}

export default AdminUserbody

