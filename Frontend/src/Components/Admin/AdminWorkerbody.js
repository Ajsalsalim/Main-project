import * as React from 'react';
import ADMINAPI from "../../api/adminapi"
import { useEffect,useState } from 'react';
import {logout} from "../../Redux/actions/AdminauthSlice"
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from "@mui/material/Button"
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../Common/Toastify';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Location',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  

const AdminWorkerbody = () => {
    const [workerlist,setWorkerlist]=useState([])
    const [updateComponent, setUpdateComponent] = useState(false);
    const [toastify,setToast] = useState(false)
    const navigate =useNavigate();
    const dispatch = useDispatch();

      useEffect(()=>{
        try{
            ADMINAPI.get("/admin/getworkers")
           .then((res)=>{
            if(res.data.message==="Token invalid"){

              setToast(true)
              setTimeout(()=>{
                
                dispatch(logout())
                navigate("/admin")

              },5000)
              
            }else{
              const workerlist=res.data.workerlist;
              setWorkerlist(workerlist)

            }


        

           })

        }catch(err){

        }
      },[updateComponent,navigate])

      const updateUserStatus = (workerId, isBlocked) => {
        setWorkerlist((prevUserlist) =>
          prevUserlist.map((worker) =>
            worker._id === workerId ? { ...worker, isBlocked } : worker
          )
        );
      };
    
      const handleActionUser = (workerId,workerblocked) => {
        if(!workerblocked){
          ADMINAPI.post(`/admin/blockworker/${workerId}`)
          .then((res) => {
            if(res.data.message==="Token invalid"){
              setToast(true)
              setTimeout(()=>{
                
                dispatch(logout())
                navigate("/admin")
    
              },5000)
               
            }else if(res.data.message==="blocked successfully"){
              toast.success(res.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            updateUserStatus(workerId, true);
            setUpdateComponent(!updateComponent);

            }
              
          })
          .catch((error) => {
           
            console.error('Error blocking worker', error);
          }) 

        }else{
          ADMINAPI.post(`/admin/unblockworker/${workerId}`)
          .then((res)=>{
            if(res.data.message==="Token invalid"){
              setToast(true)
              setTimeout(()=>{
                
                dispatch(logout())
                navigate("/admin")
    
              },5000)
               
            }else if(res.data.message==="unblocked successfully"){
              toast.success(res.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            updateUserStatus(workerId, false);
            setUpdateComponent(!updateComponent);

            }
   
          })
          .catch((error) => {
           
            console.error('Error unblocking worker', error);
          }) 

        }
         
        
      
        
      };



  return (
    <>
    <TableContainer sx={{marginTop:"50px",marginLeft:"20px"}} component={Paper}>
    

    <Table  aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Action</TableCell>

          
        </TableRow>
      </TableHead>
      <TableBody>
        {workerlist.map((item) => (
          <TableRow
            key={item.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item.name}
            </TableCell>
           
            <TableCell >{item.phone}</TableCell>
            <TableCell >{item.email}</TableCell>
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

export default AdminWorkerbody
