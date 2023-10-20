import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import io from 'socket.io-client';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import "../User/chatstyles.css"
import { logout } from '../../Redux/actions/AuthSlice';
import API from '../../api/api';
const socket = io.connect('http://localhost:5000');

const Workerchat = () => {
    const { _id,name } = useParams();
    const userId =_id
    console.log(userId);
    const [messagelist, setMessagelist] = useState([]);
    const [message, setMessage] = useState('');
    const [chatinitiated,setChatinitiated]=useState(false)
    const workerId= localStorage.getItem("id")
    const userType = localStorage.getItem("userType")
    const roomId=`${userId}-${workerId}`
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
      console.log(userId);
      console.log(userType);
        // Join a room based on the user ID and type
        socket.emit('joinRoom', { userId, workerId });
    
        // Listen for incoming messages
        socket.on('recieve_message', (data) => {
          setMessagelist((prevMessages) => [...prevMessages, data]);
        });
    
        return () => {
          // Leave the room when the component unmounts
          socket.emit('leaveRoom', { userId, workerId });
        };
      }, [userId, workerId,socket]);
      useEffect(()=>{
        API.get(`/chat/getmessages/${roomId}`)
        .then((res)=>{
          console.log(res.data);
          if(res.data.message==="Token invalid"){
            dispatch(logout());
            navigate("/login", { state: { isExpired: true } });
          }
         else if(res.data.message==="didnt chat yet"){
               setChatinitiated(true)
          }else{
            setMessagelist(res.data)

          }
         
        })

      },[])

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
          // Send the message to the server along with user and room info
          await socket.emit('send_message',messageData);
          setChatinitiated(false)
          // Update the local state with the sent message
          setMessagelist((prevMessages) => [...prevMessages,messageData]);
    
          // Clear the input field
          setMessage('');
        }
      };

  return (
    <div className="chat-window">

    <div className="chat-header">
      <p>{name}</p>
    </div>
    <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messagelist.map((messageContent) => {
          return (
            <div
              className="message"
              id={`${workerId}` === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  
                </div>
              </div>
            </div>
          );
        })}
         {chatinitiated&&(<p>you can start the conversation</p>)}
      </ScrollToBottom>
    </div>
    <div className="chat-footer">
      <input
        type="text"
        value={message}
        placeholder="Hey..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  </div>
  )
}

export default Workerchat
