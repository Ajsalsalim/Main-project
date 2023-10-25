import React,{useEffect,useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { Paper,Grid,Divider,TextField,Typography,List,ListItem,ListItemIcon,ListItemText,Avatar,Fab } from '@mui/material'
import SendIcon from "@mui/icons-material/Send"
import axios from "axios"
import CircularProgress from '@mui/joy/CircularProgress';
import io from 'socket.io-client';
import "../User/chatstyles.css"
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';
const socket = io.connect(process.env.REACT_APP_SOCKET_URL);



const Chat = () => {
    const workerId = localStorage.getItem("id");
    const [workername,setWorkername]=useState()
    const [image,setImage]=useState()
    const [users,setUsers]=useState([]);
    const [userchat,setUserchat]=useState([])
    const [userId,setUserid]=useState()
    const [message,setMessage]=useState("")
    const [text,setText] =useState(false)
    const [loading,setLoading]=useState(true)
    const listRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Scroll down to the bottom of the list when messages change
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }, [userchat]);

    useEffect(() => {
        console.log(userId);
        console.log(workerId);
          // Join a room based on the user ID and type
          socket.emit('joinRoom', { userId, workerId });
      
          // Listen for incoming messages
          
      
          return () => {
            // Leave the room when the component unmounts
            socket.emit('leaveRoom', { userId, workerId });
          };
        }, [userId,workerId,socket]);

        useEffect(()=>{
          socket.on('recieve_message', (data) => {
            console.log(data);
           setUserchat((prevMessages) => [...prevMessages, data]);
           console.log(userchat);
         });


        },[])

    useEffect(()=>{
        API.get(`/chat/getworkerchats?workerid=${workerId}`)
        .then((res)=>{
            console.log(res.data);
            if(res.data.message==="Token invalid"){

              dispatch(logout())
              navigate("/login", { state: { isExpired: true } });
      
            }else{
              setLoading(false)
              setWorkername(res.data.workername)
            setImage(res.data.profilepicture)
            setUsers(res.data.users)

            }
            

        })

    },[])


    const sendRequest = (userId) => {
      setText(true)
        setUserid(userId)
        API.get(`/chat/workerchatcontents?userid=${userId}&workerid=${workerId}`)
        .then((res)=>{
          if(res.data.message==="Token invalid"){

            dispatch(logout())
            navigate("/login", { state: { isExpired: true } });
    
          }else{
            console.log(res.data.messages);
            setUserchat(res.data.messages)

          }
           
        })
       
      
        
      };
      const sendMessage = async() => {
        if (message.trim() !== '') {


          const messageData={
            room: `${userId}-${workerId}`,
            userId:userId,
            workerId:workerId,
            author: workerId,
            message: message,
            time:
            new Date(Date.now()).toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            })
        
          }
            console.log(messageData);
          await socket.emit('send_message',messageData);
        //   setChatinitiated(false)
    
          // Update the local state with the sent message
          setUserchat((prevMessages) => [...prevMessages,messageData]);
    
          // Clear the input field
          setMessage("");
        }
      };


    
    

  return (
    <div>
         <Grid sx={{marginTop:"60px"}} container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid sx={{marginTop:"30px",height:"70vh",width:"80%",display:"inline-flex",justifyContent:"center"}} container component={Paper} >
            <Grid sx={{backgroundColor:"skyblue"}} item xs={3}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_API_SERVER_URL}/uploads/${image}`} />
                        </ListItemIcon>
                        <ListItemText primary={workername}></ListItemText>
                    </ListItem>
                </List>
                <Divider sx={{borderWidth:3,borderColor:"black"}} />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    {users.map((user)=>(
                       
                        <>
                        <ListItem button key={user._id}  onClick={() => sendRequest(user._id)}>
                        <ListItemIcon>
                            <Avatar alt={user.name} src={`${process.env.REACT_APP_API_SERVER_URL}/uploads/${user.profilepicture}`}  />
                        </ListItemIcon>
                        <ListItemText primary={user.name}></ListItemText>
                        </ListItem>
                        </>
    
                    ))}
                    
                </List>
            </Grid>
            <Grid item xs={9}>
                <List sx={{height:"60vh",overflowY:"auto"}} ref={listRef}>
                {loading&& <CircularProgress sx={{marginTop:"200px"}} variant="outlined" />}
                    {userchat.map((chat,index)=>(
                         <ListItem key={index}>
                         <Grid container> 
                         {chat.author===workerId?(
                            <>
                            <Grid item xs={12}>
                            <ListItemText align="right" primary={chat.message}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="right" secondary={chat.time}></ListItemText>
                        </Grid>
                        </>

                         ):(
                            <>
                            <Grid item xs={12}>
                            <ListItemText align="left" primary={chat.message}></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="left" secondary={chat.time}></ListItemText>
                        </Grid>
                        </>

                         )}

                         </Grid>
                     </ListItem> 

                    ))}
                    
                        
                </List>
                {text?(
                  <Grid container style={{padding: '10px'}}>
                  <Grid item xs={11}>
                      <TextField
                      value={message}
                      onChange={(event) => {
                          setMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                          event.key === "Enter" && sendMessage();
                        }}

                       id="outlined-basic-email" label="Type Something" fullWidth />
                  </Grid>
                  <Grid xs={1} align="right">
                      <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                  </Grid>
              </Grid>

                ):(
                  null
                )}
                <Divider />
               
            </Grid>
        </Grid>
      
    </div>
  )
}

export default Chat