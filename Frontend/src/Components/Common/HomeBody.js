import React, {useEffect,useState} from 'react'
import axios from "axios"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import Grid from '@mui/joy/Grid';

const HomeBody = () => {
  const [professionlist,setProfessionlist]=useState([]);
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_SERVER_URL}/professions`)
   .then((data)=>{
    setLoading(false)
     console.log(data.data.professionlist);
     setProfessionlist(data.data.professionlist)
   })
  
 },[])



  return (
    <>
   <div style={{ marginTop: "40px" }}>
   {loading&& <CircularProgress sx={{marginTop:"200px"}} variant="outlined" />}
   <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ flexGrow: 0}}
    >
    
  {professionlist.map((item,index) => (
     <Grid sx={{display:"flex",justifyContent:"center"}} key={index} item xs={12} sm={4} md={4}>
    <Card key={item.id} sx={{ maxWidth: 345, marginBottom: "15px",width:"100%" }}>
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
    </Card>
    </Grid>
  ))}
   </Grid>
</div>

</>
  )
}

export default HomeBody
