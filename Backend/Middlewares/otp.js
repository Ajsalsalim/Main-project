const nodemailer = require("nodemailer")
const User = require("../Models/user");
const Worker = require("../Models/worker")
const zeroBounceApiKey="e97b255e847c4f2fba0c8ed737492565"
const axios = require("axios")




const otp =async(req,res,next)=>{
  const {otp,userType}=req.body;
  if(otp||userType){
    next();

  }else{

    const {email,selectedvalue}=req.body;
    if(selectedvalue==="customer"){
      
      let existinguser= await User.findOne({email:email})
        if(existinguser){
            console.log("hello");
            return res.json({message:"customer already exist"})
        }

  //     const apiUrl = `https://api.zerobounce.in/v2/validate?api_key=${zeroBounceApiKey}&email=${email}&ip_address=156.124.12.145`;

  //     axios.get(apiUrl)
  // .then(async response => {
  //   const data = response.data;

      // if (data.status === 'valid') {
      
   const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const otp = generateOTP();

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

    console.log('OTP sent:', info.response);
    return res.json({ message: 'OTP sent successfully',otp:otp });
  });
        
      // } else {
      //   console.log("hi");
      //   return res.json({ message: 'Invalid email address' });
      // }
    // })



       
    }else{


        let existingworker= await Worker.findOne({email:email})
        if(existingworker){
            console.log("hello");
            return res.json({message:"worker already exist"})
        }
    //     const apiUrl = `https://api.zerobounce.in/v2/validate?api_key=${zeroBounceApiKey}&email=${email}&ip_address=156.124.12.145`;

    //     axios.get(apiUrl)
    // .then(async response => {
    //   const data = response.data;
    //   console.log(data);
  
    //     if (data.status === 'valid') {

   const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }
    console.log(email);
  const otp = generateOTP();

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

    console.log('OTP sent:', info.response);
    return res.json({ message: 'OTP sent successfully',otp:otp });
  });


    // }else{
    //   return res.json({ message: 'Invalid email address' });
    // }
  // })
  }

}
}

exports.otp=otp