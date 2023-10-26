import React from 'react'
import { Box, Container, Grid, Typography } from "@mui/material";
const AdminFooter = () => {
  return (
    <Box
    sx={{
      width: "100%",
      height: "100px",
      marginTop:"320px",
      backgroundColor: "black",
    
      
    }}
  >
    <Container maxWidth="lg">
      <Grid container direction="column" >
        <Grid  sx={{marginTop:"-20px",marginLeft:"200px"}} item xs={12}>
          <Typography color="white" variant="h5">
          <img src="\images\attachment_117444264-removebg-preview.png" alt="logo" height={"90"} width="90" />
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginLeft:"200px",marginTop:"-5px" }}>
            <Typography color="white" variant="body2">
              DESIGNED BY: Genie Technologies
            </Typography>
           
          </Grid>
       

      </Grid>
    </Container>
  </Box>
  )
}

export default AdminFooter
