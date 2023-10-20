import React, { useEffect, useState, } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { workerResult } from '../../Redux/actions/Searchresults';
import axios from "axios"
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../api/api';
import { logout } from '../../Redux/actions/AuthSlice';





const SearchForm = () => {

  const [professionlist,setProfessionlist]=useState([]);
  const [loading,setLoading]=useState(false)
  const [profession,setProfession]=useState();
  const [location, setLocation] = useState('');
  const workers = useSelector((state)=>state.search.result)


  const navigate= useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    API.get("/professions")
   .then((res)=>{
    if(res.data.message==="Token invalid"){
       dispatch(logout());
       navigate("/login", { state: { isExpired: true } }); 

    }else{
      console.log(res.data.professionlist); 
      setProfessionlist(res.data.professionlist)

    }

   })
  
  },[])

 
  
  const handlePlaceChange = async (newValue) => {
    setLocation(newValue);
    console.log(newValue);
     
  };



 
    const SearchAction = async (event) => {
      try {
        event.preventDefault()
        console.log(profession);
        console.log(location);
       
         
       if(profession===undefined&&location===""){
        toast.error("both fields are empty", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
      } else if(profession===null){
        console.log("dghyu");
        toast.error("job field is empty", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }else if(location===""){
        toast.error("location field is empty", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      }
      else{

        const response = await API.get(`/search?profession=${profession}&location=${location}`);
        console.log(response);
        if(response.data.message==="Token invalid"){
          dispatch(logout());
          navigate("/login", { state: { isExpired: true } });
        }else{
          console.log(response.data.worker);
          const result= response.data.worker
        dispatch(workerResult(result))
        setLoading(true)

        }
    

      }

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:"30px"}}>
      <div style={{ marginTop: '30px' }}>
     
      
          <Autocomplete
          
            options={professionlist.map((profession) => profession.name)} // Map professions to options
            sx={{ width: 300,}}
            renderInput={(params) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField {...params} label="Search job" required />
              
              </div>
            )}
            value={profession} // Set the value
            onChange={(event, newValue) => setProfession(newValue)} // Handle change
          />
          </div>
          
          <div style={{ marginTop: '20px',marginLeft:"5px" }} >
               < PlacesAutocomplete
               
              value={location}
              onChange={handlePlaceChange}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
         <div>
          <div style={{display:"flex"}}>
          < TextField
            label="Location"
            fullWidth
            required
            sx={{marginTop:"10px",width:"300px"}}
            {...getInputProps()}
          />
          <LocationOnOutlinedIcon
          sx={{marginTop:"25px",marginLeft:"-25px"}}/>
          

          </div>
                <div style={{ maxWidth: '300px', overflowY: 'auto',alignItems:"center",zIndex:500,backgroundColor:"white",position:"absolute" }}>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                {...getSuggestionItemProps(suggestion)}
                
              >    
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
    <ToastContainer/>
    </div>
         
        
       
        <Button onClick={SearchAction} sx={{marginLeft:"5px",marginTop:"29px",height:"54px",backgroundColor:"skyblue","&:hover":{backgroundColor:"deepskyblue"}}} type='submit'  variant="contained">Find</Button>
      
        </div>
      

      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center",marginLeft:"30px",marginTop:"20px" }} >
      {workers.length > 0 ? (
  workers.map((item) => (
    <>
    <Card key={item.id} sx={{ maxWidth: 400,margin:"10px",height:"300px",width:"250px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="100"
          image={`http://localhost:5000/uploads/${item.profilepicture}`}
          alt={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.profession[0].name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.profession[0].description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button sx={{width:"30px",height:"30px",color:"white",backgroundColor:"skyblue","&:hover":{backgroundColor:"deepskyblue"}}} onClick={()=>navigate(`/user/viewprofile/${item._id}`)}>view</Button>
    </Card>
   
    </>
    
  ))
  

) 
: loading&& (
 
  
  <h4>No matches found</h4>

 
)}

    </div>
    </>
   
  );
};

export default SearchForm;
