import React from 'react'
import { Box, Container, Grid, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <Box
    sx={{
      width: "100%",
      height: "250px",
      marginTop:"75px",
      backgroundColor: "black",
      paddingTop: "3rem",
      paddingBottom: "1rem",
    }}
  >
    <Container maxWidth="lg">
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography sx={{marginTop:"-40px"}} color="white" variant="h5">
          <img src="\images\attachment_117444264-removebg-preview.png" alt="logo" height={"90"} width="90" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{display:"flex",justifyContent:"space-between"}} color="white" variant="subtitle1">
           <InstagramIcon/>
           <FacebookIcon/>
           <TwitterIcon/>
           <LinkedInIcon/>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "1rem" }}>
            <Typography color="white" variant="body2">
              Address: DOTSPACE KAZHAKKOOTTAM
            </Typography>
            <Typography color="white" variant="body2">
              Enquiries: 9946887321
            </Typography>
            <Typography color="white" variant="body2">
              Description: This app is designed for connecting user and worker.
            </Typography>
          </Grid>

      </Grid>
    </Container>
  </Box>
  )
}

export default Footer
