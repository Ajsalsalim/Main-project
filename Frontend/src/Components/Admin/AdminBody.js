import React,{useState,useEffect} from 'react'
import Sweetalert from './Sweetalert'
import { useDispatch } from 'react-redux'
import {logout} from "../../Redux/actions/AdminauthSlice"
import axios from "axios"
import {Navigate,useNavigate} from "react-router-dom"
import ADMINAPI from "../../api/adminapi"
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Typography,Box,Paper,TextField, } from '@mui/material';
import Toastify from '../Common/Toastify'



const AdminBody = () => {
  const [professionlist,setProfessionlist]=useState([]);
  const [open,setOpen]=useState(false)
   const [delet,setDelet]=useState(false)
   const [toastify,setToast] = useState(false)
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [id,setId]=useState("")
  const [selectedimage, setSelectedImage] = useState("");
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const form =new FormData()
  form.append("name",name);
  form.append("description",description)
  form.append("image",selectedimage)
 
    useEffect(()=>{
       ADMINAPI.get("/admin/getprofessions")
      .then((res)=>{
        if(res.data.message==="Token invalid"){
          setToast(true)
          setTimeout(()=>{
            
            dispatch(logout())
            navigate("/admin")

          },5000)
           
        }else{
          console.log(res.data.professionlist);
          setProfessionlist(res.data.professionlist)

        }
       


      })
    },[delet])

    const handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      if(imageFile){
        console.log(imageFile);
        setSelectedImage(imageFile);
      }

    };



    const modalhandler =(professionid)=>{
      setOpen(true)
      ADMINAPI.get(`/admin/getprofession?professionid=${professionid}`)
      .then((res)=>{
        console.log(res);
        if(res.data.message==="Token invalid"){
          setToast(true)
          setTimeout(()=>{
            
            dispatch(logout())
            navigate("/admin")

          },5000)

        }else{
          setName(res.data.name)
          setDescription(res.data.description)
          setId(res.data._id)

        }
      
      })
      


    }
    const handleSubmit = async(professionid)=>{
     await ADMINAPI.post(`/admin/editprofession?professionid=${professionid}`,form)
      .then((res)=>{
         if(res.data.message==="Token invalid"){
          setToast(true)
        }
       
      })

    }
    const handledelete =(professionid)=>{
      Sweetalert.confirm("Are you sure?","You wont be able to revert this!")
      .then(async(result)=>{
        if(result.isConfirmed){
         await ADMINAPI.delete(`/admin/deleteprofession/${professionid}`)
      .then((res)=>{
        if(res.data.message==="Token invalid"){
          setToast(true)

        }else{
          setDelet(true)
        console.log(res.data);
        setProfessionlist(res.data)

        }
        
         
      })
          Sweetalert.success("Deleted!","Profession has been deleted")
        }



      })
      

    }

    const handleClose=()=>{
      setOpen(false)
    }
    
  return (
    <>
      <Container sx={{ marginTop: '50px' }}>
        <Typography sx={{ textAlign: 'left' }}>PROFESSIONS</Typography>
        <div
          style={{
            marginTop: '50px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {professionlist.map((item) => (
            <Card
              key={item.id}
              sx={{ maxWidth: 345, marginBottom: '15px', width: '400px' }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_API_SERVER_URL}/uploads/${item.image}`}
                  alt={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button
                onClick={() => modalhandler(item._id)}
                sx={{
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'skyblue',
                    height: '30px',
                  },
                  justifyContent: 'space-between',
                }}
              >
                Edit
              </Button>
              <Button
              onClick={()=>handledelete(item._id)}
                sx={{
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'skyblue',
                    height: '30px',
                  },
                }}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
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
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius:"10px"
          }}
        >
          <Container sx={{ marginTop: '' }}>
            <Paper elevation={3}>
              <Box p={3}>
                <form onSubmit={()=>handleSubmit(id)}>
                  <Typography
                    sx={{ textAlign: 'left' }}
                    variant="h6"
                    gutterBottom
                  >
                    EDIT PROFESSION
                  </Typography>
                  <TextField
                    label="Profession Name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Description"
                    type="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <Button
                      sx={{
                        backgroundColor: 'skyblue',
                        '&:hover': { backgroundColor: 'deepskyblue' },
                        width: '70px',
                        height: '30px',
                      }}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </label>
                </form>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Modal>

      <ToastContainer />
      {toastify?(
        <Toastify/>

      ):(
        null
      )

      }

    </>
  );
}

export default AdminBody
