import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import Table from '@mui/joy/Table';
import axios from 'axios';
import { Button,Container,Paper,Box } from '@mui/material';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const workerid = localStorage.getItem('id');
  const navigate = useNavigate();
  const dispatch = useDispatch();
console.log(process.env.REACT_APP_API_BASE_URL);
  useEffect(() => {
    API.get(`/userbooking?workerid=${workerid}`).then((res) => {

      console.log(res.data);
      if(res.data.message==="Token invalid"){

        dispatch(logout())
        navigate("/login", { state: { isExpired: true } });

      }else{
        setAppointments(res.data);
      }
   
    });
  }, [workerid]);

  const updateStatus = async (appointmentid, newStatus) => {
    try {
      const res = await API.get(`/updatebooking?appointmentid=${appointmentid}&status=${newStatus}`);
      console.log(res.data.message);
      if(res.data.message==="Token invalid"){

        dispatch(logout())
        navigate("/login", { state: { isExpired: true } });

      }else{
        setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentid ? { ...appointment, status: newStatus } : appointment
        )
      );

      }

   
    
    } catch (error) {
      console.log(error);
    }
  };

  const Confirm = async (appointmentid) => {
    await updateStatus(appointmentid, 'Confirmed');
  };

  const Complete = async (appointmentid) => {
    await updateStatus(appointmentid, 'Completed');
  };

  return (
        
          <Container maxWidth="md" sx={{marginTop:"60px",height:"330px"}}>
       <Paper elevation={3}>
    <Box  p={3}>
      {appointments&&appointments.length>0?(
        <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Customer</th>
            <th style={{ textAlign: 'center' }}>Date</th>
            <th style={{ textAlign: 'center' }}>Time</th>
            <th style={{ textAlign: 'center' }}>Worksite</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Action</th>
            <th style={{ textAlign: 'center' }}>Connect</th>
            
          </tr>
        </thead>
        <tbody>
          {appointments.map((item) => (
            <tr key={item._id}>
              <td>{item.customer.name}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.location}</td>
              <td>{item.status}</td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {item.status === 'Requested' ? (
                    <Button onClick={() => Confirm(item._id)} variant="contained" sx={{ backgroundColor: 'green', color: 'white', width: '70px', height: '25px' }}>
                      Confirm
                    </Button>
                  ) : (item.status==="Confirmed"?(
                    <>
                    <Button onClick={() => Complete(item._id)} variant="contained" sx={{ backgroundColor: 'green', color: 'white', width: '80px', height: '25px' }}>
                    jobdone
                  </Button>
                  </>
                  ):(
                    <Button disabled>jobdone</Button>
                  )
                    
                   
                    
                    
  )}
                </div>
              </td>
              <td>
                <div>
                  {item.status==="Confirmed"||item.status==="Completed"?(
                     <Button  sx={{backgroundColor:"skyblue",color:"white",height:"25px",display:"flex",justifyContent:"center",marginLeft:"auto","&:hover":{backgroundColor:"deepskyblue"}}} onClick={()=>navigate(`/worker/chat/${item.customer._id}/${item.customer.name}`)}  variant="contained" >
                     Chat
                   </Button>

                  ):(
                    <Button disabled  variant="contained"  sx={{backgroundColor:"skyblue",color:"white",height:"25px",display:"flex",justifyContent:"center",marginLeft:"auto","&:hover":{backgroundColor:"deepskyblue"}}}>
                     Chat
                   </Button>
                    

                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      ):(
        <h6>No appointments have been scheduled</h6>

      )
}
      
      </Box>
      </Paper>
    </Container>
   
    
  );
};

export default Appointment;


