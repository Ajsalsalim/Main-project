import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import axios from "axios";
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import Chip from '@mui/joy/Chip';
import { Button,Modal,Box,Container,Paper,TextField, TextareaAutosize, } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';

 

const Viewprofile2 = () => {
    const userid =localStorage.getItem("id")
    const { _id,status } = useParams();
    const id =_id
    console.log(id);
    console.log(status);
  
    const [profile,setProfile] = useState();
    const [loading,setLoading] = useState(true);
    const [feedback,setFeedback]=useState("")
    const [rating,setRating]=useState(2)
    const [open,setOpen]=useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()


    useEffect(()=>{
        API.get(`/workerprofile/${id}`)
        .then((res)=>{
          if(res.data.message==="Token invalid"){
            dispatch(logout());
            navigate("/login", { state: { isExpired: true } });
          }else{
            console.log(res.data.workerprofiledata);
          setProfile(res.data.workerprofiledata)
          setLoading(false)

          }
          
        })

      },[])
     

      const handleSubmit = async(event)=>{
        event.preventDefault()
        console.log("hi");
        console.log(rating);
      
         await API.post(`/workerfeedback?id=${id}&userid=${userid}`,
             {
              rating:rating,
              feedback:feedback

             }
         )
         .then((res)=>{
          console.log(res);
          if(res.data.message==="Rating added successfully"){
            toast.success("Rated successfully", {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
           
            setOpen(false)

          }else if(res.data.message==="Token invalid"){
            dispatch(logout());
            navigate("/login", { state: { isExpired: true } });
          }
         })

      }

      const modalhandler=()=>{
        setOpen(true)


      }
      const handleclose=()=>{
        setOpen(false)
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
          {profile.availability?(
          <Typography level="body-sm" color='success'> AVAILABLE</Typography>
          ):( <Typography level="body-sm" color='danger'>NOT AVAILABLE</Typography>)

    }
       
        <CardOverflow sx={{ bgcolor: 'background.level1',display:"flex",justifyContent:"center",alignItems:"center" }}>
        <CardActions>
        {status === "Confirmed"||status==="Completed" ? (
            <Button sx={{backgroundColor:"skyblue",color:"white",width:"50px",height:"25px","&:hover":{backgroundColor:"deepskyblue"}}} onClick={()=>navigate(`/user/chat/${profile.name}/${profile._id}`)}>Chat</Button>
        ) : (
            <Button  disabled >Chat</Button>
        )}
        </CardActions>
        </CardOverflow>
         </CardContent>
        
      </Card>
       {status==="Completed"?(
        <Button onClick={modalhandler}  sx={{backgroundColor:"skyblue",color:"white",height:"25px",justifyContent:"center","&:hover":{backgroundColor:"deepskyblue"}}}>Rate</Button>
      ):(
        null
      )}
      </>
      
    )}
     <Modal
        open={open}
        onClose={handleclose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'skyblue',
            boxShadow: 24,
            p: 4,
            borderRadius:"10px"
          }}
        >
          <Container>
            <Paper elevation={3}>
              <Box p={3}>
                <form onSubmit={handleSubmit}>
                  <Typography
                    sx={{ textAlign: 'center' }}
                    variant="h6"
                    gutterBottom
                  >
                    Rate Worker
                  </Typography>
                  
                  <TextField
                    label="Feedback"
                    type="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <Typography component="legend">Give your Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />

  
                    <Button
                      sx={{
                        backgroundColor: 'skyblue',
                        '&:hover': { backgroundColor: 'deepskyblue' },
                        width: '70px',
                        height: '30px',
                        display:"flex"
                      }}

                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Rate
                    </Button>
                
                </form>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Modal>

<ToastContainer/>
  </>
  )
}

export default Viewprofile2
