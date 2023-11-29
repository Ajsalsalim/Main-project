const User = require("../Models/user");
const Worker = require("../Models/worker")
const Banner= require("../Models/banner");
const Profession= require("../Models/profession")
const Appointment = require("../Models/appointment")
const jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios")
const nodemailer= require("nodemailer");



const signup =async(req,res)=>{
    try{
        if (req.body.googleAccessToken) {
            const {googleAccessToken,userType} = req.body;
    
            axios
                .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
                .then(async response => {
                    console.log(userType);
                    const name = response.data.given_name;
                    const email = response.data.email;
                    if(userType==="customer"){
                        const existingUser = await User.findOne({email})
                        if (existingUser){
                            return res.json({message: "User already exist!"})
                        }
    
                        const result = await User.create({email, name})
                        const token = jwt.sign({
                            email: result.email,
                            id: result._id
                        },  process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
                        res.json({result, token,userType,message:"Signup successfull",id:result._id})

                    }else{
                        const existingWorker = await Worker.findOne({email})
                        if (existingWorker){
                            return res.json({message: "Worker already exist!"})
                        }
                        const result = await Worker.create({email, name})
                        const token = jwt.sign({
                            email: result.email,
                            id: result._id
                        },  process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
                        res.json({result, token,userType,message:"Signup successfull",id:result._id})
                        }
                       
                        
                })
                .catch(err => {
                    res .status(400).json({message: "Invalid access token!"})      
                })
    
        } else {
            


        const {name,email,password,phone,selectedvalue}=req.body;
        if(selectedvalue==="customer"){
            let existinguser= await User.findOne({email:email})
            if(existinguser){
                console.log("hello");
                return res.json({message:"customer already exist"})
            }
            const hashedPassword=bcrypt.hashSync(password)
            const user = new User({
                name,
                email,
                phone,
                password: hashedPassword
            });
            await user.save();
            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
            console.log("Generated Token\n",token);

            return res.json({message:"succesfully signed up",customer:user,token:token,id:user._id})

        }else if(selectedvalue==="worker"){
            let existingworker= await Worker.findOne({email:email})
            if(existingworker){
                return res.json({message:"worker already exist"})
            }
            const hashedPassword=bcrypt.hashSync(password)
            const worker= new Worker({
                name,
                email,
                phone,
                password: hashedPassword
            });
            await worker.save();
            const token = jwt.sign({_id:worker._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
            console.log("Generated Token\n",token);
          
            return res.json({message:"succesfully signed up",worker:worker,token:token,id:worker._id})

        }
        return res.status(201).json({message:"hi"})
    }
    }catch(err){
       console.log(err);
    }

}
const login = async(req,res)=>{
    try{
        if(req.body.googleAccessToken){
            // gogole-auth
            const {googleAccessToken,userType} = req.body;
    
            axios
                .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
                .then(async response => {
                    const email = response.data.email;
                    if(userType==="customer"){
                        const existingUser = await User.findOne({email})
    
                        if (!existingUser) {
                        return res.json({message: "User doesn't exist!"})
                        } else if(existingUser.isblocked){
                            console.log("hello"+existingUser.isblocked);
                            return res.json({message:"customer is blocked by admin"})
                
                        }
                        const token = jwt.sign({
                            email: existingUser.email,
                            id: existingUser._id
                        }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
                
                        res.json({result: existingUser, token,userType,message:"login successfully",id:existingUser.id})
                            
                    }else{
                        const existingWorker = await Worker.findOne({email})
    
                        if (!existingWorker){
                        return res.json({message: "Worker doesn't exist!"})
                        } else if(existingWorker.isblocked){
                            return res.json({message:"worker is blocked by admin"})
                
                        }
                        const token = jwt.sign({
                            email: existingWorker.email,
                            id: existingWorker._id
                        }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
                
                        res.json({result: existingWorker, token,userType,message:"login successfully",id:existingWorker.id})

                   }
                        
                })
                .catch(err => {
                    res.status(400).json({message: "Invalid access token!"})
                        
                       
                })
        }else{
        const {email,password,selectedvalue}=req.body
        if(selectedvalue==="customer"){
            let existinguser= await User.findOne({email:email})

        if(!existinguser){
            return res.json({message:"customer not found. signup please"})
        }
        else if(existinguser.isblocked){
            return res.json({message:"customer is blocked by admin"})

        }
        const isPasswordCorrect = bcrypt.compareSync(password,existinguser.password)
        if(!isPasswordCorrect){
            return res.json({message:"Invalid Email/password"})
        }
        const token = jwt.sign({id:existinguser._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "1h"
        });
        console.log("Generated Token\n",token);
       
         return res.json({message:"succesfully logged in",customer:existinguser,token,id:existinguser._id})
        }else if(selectedvalue==="worker"){
            let existingworker= await Worker.findOne({email:email})

        if(!existingworker){
            return res.json({message:"worker not found. signup please"})
        }
        else if(existingworker.isblocked){
            return res.json({message:"worker is blocked by admin"})

        }

        const isPasswordCorrect = bcrypt.compareSync(password,existingworker.password)
        if(!isPasswordCorrect){
            return res.json({message:"Invalid Email/password"})
        }
        const token = jwt.sign({id:existingworker._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "1h"
        });
        console.log("Generated Token\n",token);
        
         return res.status(200).json({message:"succesfully logged in",worker:existingworker,token,id:existingworker._id})
        }
        
    }

    }catch(err){
        console.log(err);

    }

   

}


const forgotpassword= async(req,res)=>{
    const {email,selectedvalue}=req.body;
    console.log("vannu");
    if(selectedvalue==="customer"){
        let existinguser=await User.findOne({email:email})
        console.log(existinguser);
        if(!existinguser){
            console.log("keryo");
            return res.json({message:"email not found"})
        }
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
                  return res.json({ message: 'Failed to send OTP' });
                }
            
                console.log('OTP sent:', info.response);
                return res.json({ message: 'OTP sent successfully',otp:otp });
              });

        



    }else{
        let existingworker=await Worker.findOne({email:email})
        if(!existingworker){
            return res.json({message:"email not found"})
        }
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
                  return res.json({ message: 'Failed to send OTP' });
                }
            
                console.log('OTP sent:', info.response);
                return res.json({ message: 'OTP sent successfully',otp:otp });
              });
 

}
}

const changepassword= async(req,res)=>{
    try{
        const {email,password,usertype}=req.body;
        console.log(email);
        console.log(usertype);
        console.log(password);
        if(usertype==="customer"){
            let existinguser = await User.findOne({email:email});
            const hashedPassword=bcrypt.hashSync(password)
            existinguser.password=hashedPassword;
            await existinguser.save();

          
            

        }else{
            let existingworker= await Worker.findOne({email:email});
            console.log(existingworker);
            const hashedPassword=bcrypt.hashSync(password)
            existingworker.password=hashedPassword;
            await existingworker.save();
            

        }
        return res.json({ message: "Password updated successfully" });




    }catch(err){
        console.log(err);
    }


}
const getprofessions=async(req,res)=>{
    try{
        const professionlist=await Profession.find({deleted:false});
        res.json({message:"professionlist is here",professionlist:professionlist})


    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getbanners=async(req,res)=>{
    try{
        const bannerlist=await Banner.find();
        console.log(bannerlist);
        res.json({message:"bannerlist is here",bannerlist:bannerlist})


    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getcredentials = async(req,res)=>{
    try{
        const {workerid} =req.query;
        const worker = await Worker.findOne({_id:workerid})
         return res.json(worker)

    }catch(err){
        console.log(err);
    }
}
const getusercreds = async(req,res)=>{
    try{
        const {userid}=req.query;
        const user = await User.findOne({_id:userid})
        return res.json(user)

    }catch(err){
        console.log(err);
    }
}

const profilesetup = async(req,res)=>{
    
    try{
        console.log(req.body);
        const{email,profession,experience,description,...updatedData}=req.body;
        const imagePath = req.file.filename;
        console.log(imagePath);
   
       
        console.log(profession);
        const existingworker = await Worker.findOne({email:email})

        if(!existingworker){
            return res.json({message:"email is not matching"})
        }
        const newProfession = {
            name: profession,
            experience,
            description,

          };
          existingworker.profilepicture=imagePath
            
          
          existingworker.profession.push(newProfession)

        Object.assign(existingworker, updatedData);
        existingworker.isprofilecreated=true
        existingworker.isverified="pending"
        await existingworker.save();
     
        return res.json({ message: 'Worker profile updated successfully',id:existingworker._id });

    }catch(err){
        console.error('Error updating worker profile', err);
        return res.status(500).json({ message: 'Internal Server Error' });

    }

}

const editworker =async(req,res)=>{
    try{
        const {email,name,phone,location,gender,timepreference,availability} = req.body;
        if(req.file){
            const imagepath = req.file.filename
            const worker =await Worker.findOne({email:email})
            worker.name=name;
            worker.phone=phone;
            worker.location=location;
            worker.gender=gender;
            worker.profilepicture=imagepath
            worker.timepreference=timepreference;
            worker.availability=availability;
            await worker.save();
            return res.json(worker)

        }else{
            const worker =await Worker.findOne({email:email})
            worker.name=name;
            worker.phone=phone;
            worker.location=location;
            worker.gender=gender;
            worker.timepreference=timepreference;
            worker.availability=availability;
            await worker.save();
            return res.json(worker)


        }
       

    }catch(err){
        console.log(err);
    }
}
const userprofilesetup = async(req,res)=>{
    try{
        console.log(req.body);
        const {email,phone,gender,address}=req.body;
        const imagePath = req.file.filename;
        console.log(imagePath);
        const existinguser = await User.findOne({email:email})
        if(!existinguser){
            return res.json({message:"email is not matching"})
        }
        existinguser.phone=phone;
        existinguser.gender=gender;
        existinguser.address=address;
        existinguser.profilepicture=imagePath;
        existinguser.isprofilecreated=true;
        await existinguser.save();
        return res.json({user:existinguser,message:"profile created successfully"})



    }
    catch(err){
        console.log(err);
    }
}
const edituser = async(req,res)=>{
    try{
        console.log(req.body);
        const {name,email,phone,gender,address}=req.body;
        const {userid}=req.query;
        if(req.file){
        const imagePath = req.file.filename;
        const user=await User.findOne({_id:userid})
        user.name=name;
        user.email=email;
        user.phone=phone;
        user.profilepicture=imagePath;
        user.gender=gender;
        user.address=address;

        await user.save();
        return res.json(user)
        }else{
            console.log("helloooo");
            const user=await User.findOne({_id:userid})
            console.log(user);
        user.name=name;
        user.email=email;
        user.phone=phone;
        user.gender=gender;
        user.address=address;

        await user.save();
        return res.json(user)
            

        }

    }catch(err){
      console.log(err);
    }
}

const workerprofile = async(req,res)=>{
    try{
        console.log("hello");
        const workerid = req.params.id
        console.log(workerid);
        const workerprofiledata = await Worker.findOne({ _id: workerid })
        .populate('rating.user', 'name profilepicture') // Populate user details within rating
        .exec();
        const ratings = workerprofiledata.rating.map((review) => review.rating);
        const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
        console.log(workerprofiledata);
        await workerprofiledata.save();
       return res.json({workerprofiledata:workerprofiledata,rating:averageRating})



    }
    catch(err){
        console.log(err);

    }

}
const workerfeedback =async(req,res)=>{
    try{
        const {id,userid} = req.query;
        console.log(req.body);
        const {feedback,rating}=req.body;
        console.log(rating);
        console.log(feedback);
        const worker= await Worker.findOne({_id:id})
        console.log("hello"+worker);

        const newRating = {
            user: userid, 
            rating: rating,
            comment: feedback,
          };
          worker.rating.push(newRating);
          await worker.save();
          res.json({message:"Rating added successfully"})

    }catch(err){
        console.log(err);
    }
}

const workersearch = async(req,res)=>{
    try{
        const { profession, location } = req.query;
        console.log(profession);
        console.log(location);

        const worker =await Worker.find({location:location,'profession.name':profession,isverified:"verified"})
       return res.json({worker:worker})



    }catch(err){

    }

}

const bookservice = async(req,res)=>{
    try{
        console.log("fhegfhe");
        console.log(req.body);
        const {location,userid,workerid,time,date}= req.body;
        function formatDate(date) {
            const x = new Date(date);
            const day = x.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
            const month = (x.getMonth() + 1).toString().padStart(2, '0'); // Get month (add 1 because months are zero-indexed) and pad with leading zero if needed
            const year = x.getFullYear().toString(); // Get full year
          
            return `${day}/${month}/${year}`;
          }

          function formatTime(time){
            const y = new Date(time);
            const hours = y.getHours().toString().padStart(2, '0');
            const minutes = y.getMinutes().toString().padStart(2, '0')
            return `${hours}:${minutes}`;
          }
          
          
          const formattedDate = formatDate(date);
          const formattedTime = formatTime(time);
          console.log(formattedDate);
        console.log("fhegfhe");
        const appointment = new Appointment({
            customer: userid,
            worker: workerid, 
            location,
            time: formattedTime,
            date: formattedDate
            
          });
       
          console.log("jfgjh"+appointment);
          await appointment.save();
          return res.json({message:"booking succesfully",appointment:appointment})
         

    }catch(err){
        console.log(err);
        
    }
}

const getappointments = async(req,res)=>{
    try{

        const { userid, id } = req.query;
        console.log(userid);
        console.log(id);
        const appointment = await Appointment.findOne({customer:userid,worker:id,status:{$ne:"Completed"}})
        console.log(appointment);
        if(!appointment){
            return res.json({message:"not booked"})
        }else{
            return res.json({message:"already booked",appointment:appointment})
        }



    }
    catch(err){
        console.log(err);
    }
}

const bookingdetails = async (req, res) => {
    try {
      const { userid } = req.query;
  
      const appointments = await Appointment.find({ customer: userid })
      .populate({
        path: 'worker',
        select: 'name profession _id'
      });
      
      console.log(appointments);
      res.json(appointments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const userbooking = async (req,res)=>{
    try{
        const {workerid} = req.query;

        const appointments= await Appointment.find({worker:workerid})
        .populate({
            path:"customer",
            select:"name"
        })
        console.log(appointments);
        return res.json(appointments)

    }catch(err){
        console.log(err);
    }

  }
 

  const updatebooking =async(req,res)=>{
    const { appointmentid, status } = req.query;
    try{
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentid,
            { status: status },
            { new: true } // Return the updated document
          );
      
          if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
          }
      
          // Respond with success message
          res.json({ message: `Appointment status updated to ${status}` });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }


   
  }

  const bookedslots=async(req,res)=>{
    try{
     
        const {workerid} =req.query;
        const appointments= await Appointment.find({worker:workerid,status:{$ne:"Completed"}})
        const bookedslots = appointments.map(appointment => {
            const mergedDateTime = appointment.date+"  "+appointment.time
            return mergedDateTime;
          });
      
          console.log(bookedslots);

          return res.json({message:"booked slots",bookedslots:bookedslots})


    }catch(error){
        console.log(error);
    }

  }
  



exports.signup=signup
exports.login= login
exports.forgotpassword= forgotpassword
exports.changepassword= changepassword
exports.getprofessions=getprofessions
exports.getbanners=getbanners
exports.getcredentials=getcredentials
exports.getusercreds=getusercreds
exports.profilesetup=profilesetup
exports.userprofilesetup=userprofilesetup
exports.workerprofile=workerprofile
exports.workersearch=workersearch
exports.bookservice=bookservice
exports.getappointments=getappointments
exports.bookingdetails= bookingdetails
exports.userbooking= userbooking
exports.updatebooking=updatebooking
exports.edituser=edituser
exports.editworker=editworker
exports.workerfeedback=workerfeedback
exports.bookedslots=bookedslots
