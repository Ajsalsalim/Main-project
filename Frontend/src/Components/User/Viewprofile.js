import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import axios from "axios";
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/joy/CircularProgress';
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import {useDispatch} from "react-redux"
import { Dialog, TextField,Rating,Paper,Container } from '@mui/material';
import {DialogActions} from "@mui/material"
import {DialogTitle} from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';
const Viewprofile = () => {
  const [profile,setProfile] = useState();
  const [rating,setRating] = useState();
  const [loading,setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [location,setLocation]=useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
 const [appointment,setAppointment]=useState()
 const navigate = useNavigate();
 const dispatch = useDispatch();

  const { _id } = useParams();
  const id =_id
  console.log(id);
  const userid = localStorage.getItem("id")

  useEffect(()=>{
    API.get(`/workerprofile/${id}`)
    .then((res)=>{
      console.log(res);
      if(res.data.message==="Token invalid"){
        dispatch(logout());
        navigate("/login", { state: { isExpired: true } });
      }else{
        console.log(res.data);
      setProfile(res.data.workerprofiledata)
      setRating(res.data.rating)
      console.log(profile);
      setLoading(false)

      }
      


    })



  },[])

  useEffect(()=>{
    
    API.get(`/appointments?userid=${userid}&id=${id}`)
     .then((res)=>{
      console.log(res.data.message);
      if(res.data.message==="already booked"){
         setAppointment(res.data.appointment)
      }else if(res.data.message==="Token invalid"){
        dispatch(logout());
        navigate("/login", { state: { isExpired: true } });

      }

     })
  },[])

 


const handleBookServiceClick = () => {
  setOpenDialog(true);

  
};

const HandleAction = async()=>{

  console.log(selectedDate);
  console.log(selectedTime);
   if (selectedDate&&selectedTime&&location){

    const appointmentData={
      date:selectedDate,
      time:selectedTime,
      location:location,
      workerid:id,
      userid:userid

    }
     API.post("/bookservice",appointmentData)
    .then((res)=>{
      if(res.data.message==="Token invalid"){
        dispatch(logout());
        navigate("/login", { state: { isExpired: true } });
      }else{
        toast.success("booking request sent", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setAppointment(res.data.appointment)

      }
      
    })
   }
 
}
  
  return (
    <>
    {loading ? (
      <CircularProgress sx={{marginTop:"200px"}} variant="outlined" />
    ) : (
      <>
      <Card
        sx={{
          marginTop:"60px",
          maxWidth: '50%',
          boxShadow: 'lg',
          display: 'flex',
          mx: 'auto',
        }}
      >
        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Avatar src={`${process.env.REACT_APP_API_SERVER_URL}/uploads/${profile.profilepicture}`} sx={{ '--Avatar-size': '4rem' }} />
          <Chip
            size="sm"
            variant="soft"
            color="primary"
            sx={{
              mt: -1,
              mb: 1,
              border: '3px solid',
              borderColor: 'background.surface',
            }}
          >
          PROFILE
          </Chip>
          <Typography level="title-lg">{profile.name}</Typography>
          {profile.profession.map((item)=>(
             <Typography key={item.id} level="body-sm" sx={{ maxWidth: '24ch' }}>
             DESCRIPTION: {item.description}
           </Typography>
           

          ))
         
          }
          <Typography level="body-sm">PHONE:{profile.phone}</Typography>
          <Typography level="body-sm">TIME AVAILABLE:{profile.timepreference}</Typography>
          <Typography>  <Rating sx={{display:"flex",justifyContent:"end"}}  value={rating} readOnly /></Typography>
        
          {profile.availability?(
          <Typography level="body-sm" color='success'> AVAILABLE</Typography>
          ):( <Typography level="body-sm" color='danger'>NOT AVAILABLE</Typography>)
    }
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: 2,
              '& > button': { borderRadius: '2rem' },
            }}
          >
            {/* Add buttons or other content here */}
          </Box>
        </CardContent>
        <CardOverflow sx={{ bgcolor: 'background.level1', display: 'flex' }}>
          <CardActions>
            {appointment&&appointment.status!=="Completed"?(
               <Alert severity="success">booking request send succesfully</Alert>
         
            ):(
              <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface', mx: 'auto' }}>
             
              <Button onClick={handleBookServiceClick}>Book service</Button>
            </ButtonGroup>
            )
}
          </CardActions>
        </CardOverflow>
      </Card>
   
    <Dialog   open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle sx={{display:"flex",justifyContent:'center'}}>Book Service</DialogTitle>
  <TextField
  value={location}
  onChange={(event)=>setLocation(event.target.value)}
    placeholder='location'
    sx={{width:"260px",marginLeft:"15px"}}
    />
 
  <DialogActions sx={{height:"250px",display:"flex",flexDirection:"column"}}>
    
      
   
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
      value={selectedDate}
      onChange={(date)=>setSelectedDate(date)}
      />
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{marginRight:"8px"}} components={['TimePicker']}>
        <TimePicker label="Time"
         value={selectedTime}
         onChange={(time)=>setSelectedTime(time)}
        />
      </DemoContainer>
    </LocalizationProvider>
    


    <div style={{marginBottom:"50px",display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
    <Button  onClick={() => setOpenDialog(false)}>Cancel</Button>
    <Button sx={{marginLeft:"50px"}}
      onClick={() => {
        HandleAction();
        setOpenDialog(false);
      }}
      color="primary"
    >
      Book
    </Button>
    </div>
  </DialogActions>
</Dialog>

<Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Reviews and Ratings
        </Typography>    

        {profile.rating.map((review) => (
  <Box key={review.id} sx={{ display: 'flex', flexDirection: 'row',  marginBottom: 5 }}>
   
    <Avatar alt={review.user.name} src={`${process.env.REACT_APP_API_SERVER_URL}/uploads/${review.user.profilepicture}`} sx={{ width: 64, height: 64, marginBottom: 1 }} />

    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
      {review.user.name}
    </Typography>

    
    <Typography sx={{marginTop:"30px"}}>{review.comment}</Typography>
    <Rating sx={{marginTop:"30px",display:"flex",justifyContent:"end"}}  value={review.rating} readOnly />
  </Box>
))}

        {profile.rating.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No reviews available.
          </Typography>
        )}
      </Paper>
    </Container>
<ToastContainer/>
  </>
  )}
  </>
    
  )
}

export default Viewprofile
