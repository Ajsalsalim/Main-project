import React,{useEffect,useState} from 'react'
import Table from '@mui/joy/Table';
import axios from "axios"
import API  from "../../api/api"
import { Button,Container,Paper,Box,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading,stopLoading,selectLoading } from '../../Redux/actions/LoadingSlice';
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';
import { logout } from '../../Redux/actions/AuthSlice';
const Appointment = () => {
     const [appointments,setAppointments] = useState([]);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const isLoading = useSelector(selectLoading);
     
     const userid = localStorage.getItem("id")

     useEffect(()=>{
      dispatch(startLoading());
      API.get(`/bookingdetails?userid=${userid}`)
      .then((res)=>{
        console.log(res.data);
        if(res.data.message==="Token invalid"){

          dispatch(logout())
          navigate("/login", { state: { isExpired: true } });

        }else{
          setAppointments(res.data)
        dispatch(stopLoading())  
        }
        
      })
     },[dispatch])
     
  return (
    <Container maxWidth="md" sx={{marginTop:"60px",height:"298px"}}>
       <Paper elevation={4}>
    <Box  p={3}>
      {isLoading?(
         <CircularProgress sx={{marginTop:"200px"}} variant="outlined" />
      ):(

    <>
            {appointments && appointments.length > 0 ? (
              <Table aria-label="basic table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Worker</th>
                    <th style={{ textAlign: 'center' }}>Profession</th>
                    <th style={{ textAlign: 'center' }}>Date</th>
                    <th style={{ textAlign: 'center' }}>Time</th>
                    <th style={{ textAlign: 'center' }}>Worksite</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                    <th style={{ textAlign: 'center' }}>Workerdetails</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((item) => (
                    <tr key={item._id}>
                      <td>{item.worker.name}</td>
                      <td>{item.worker.profession[0].name}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.location}</td>
                      <td
                        style={{
                          color:
                            item.status === 'Requested' ? 'blue' :
                            item.status === 'Confirmed' ? 'green' :
                            item.status === 'Completed' ? 'green' :
                            'black',
                        }}
                      >
                        {item.status}
                      </td>
                      <td>
                        <Button
                          sx={{
                            backgroundColor: 'skyblue',
                            color: 'white',
                            height: '25px',
                            marginTop: '8px',
                            '&:hover': { backgroundColor: 'deepskyblue' },
                          }}
                          onClick={() => navigate(`/user/viewprofile2/${item.worker._id}/${item.status}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Typography level="body-md" textAlign="center">
                No appointments available.
              </Typography>
            )}
          </>
      )}
    </Box>
      </Paper>
    </Container>
  )
}

export default Appointment
