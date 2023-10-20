import React from 'react'
import axios from "axios"
import { useState,useEffect } from 'react';
import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';

const HomeBanner = () => {
    const [bannerlist,setBanner]=useState([])
    const [selectedBannerIndex, setSelectedBannerIndex] = useState(0);
    
 useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_SERVER_URL}/banners`)
    .then((res)=>{
     console.log(res.data.bannerlist);
     setBanner(res.data.bannerlist)
    })
   },[])

   useEffect(() => {
    if (bannerlist.length > 0) {
      const timer = setTimeout(handleNextBanner, 5000); // Change banner after 5 seconds

      return () => clearTimeout(timer); // Clear the timer when component unmounts or re-renders
    }
  }, [selectedBannerIndex, bannerlist]);

  const handleNextBanner = () => {
    setSelectedBannerIndex((prevIndex) => (prevIndex + 1) % bannerlist.length);
  };

    
  return (
    <>
    {bannerlist.length > 0 && (
   <>
    
     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
     
          <Card
          sx={{
            maxWidth: "95%",
            maxHeight: "300px",
            display: 'inline-block',
            marginTop:"30px"
            
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={`${process.env.REACT_APP_API_SERVER_URL}/uploads/${bannerlist[selectedBannerIndex].image[0]}`}
              alt="hdghd"
              sx={{
                maxWidth: "100%",
                height: "100%",
                objectFit: "contain"
              }}
            />
             
          </CardActionArea>
        </Card>
        
        </div>
        <Typography
          variant="subtitle1"
          align="center"
        >
          {`${bannerlist[selectedBannerIndex].name}`}
        </Typography>
        </>
        
      )}
      </>
  
     
     
    
  )
}

export default HomeBanner
