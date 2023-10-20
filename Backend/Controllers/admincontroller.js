const Admin = require("../Models/admin");
const fs=require("fs")
const Profession= require("../Models/profession")
const User = require("../Models/user");
const Worker= require("../Models/worker")
const Banner= require("../Models/banner");
const jwt= require("jsonwebtoken");
const nodemailer= require("nodemailer")







const login= async(req,res)=>{
    try{
        console.log("hi");
        const {name,password}=req.body
        console.log(name);
        console.log(password);
        const admin= await Admin.findOne({username:name});
        console.log(admin);
        if(admin){
            console.log("hi");
            if(admin.password===password){
                const token = jwt.sign({id:admin._id},process.env.JWT_SECRET_KEY,{
                    expiresIn: "1h"
                });
                console.log("Generated Token\n",token);
                return res.status(200).json({message:"login succesfull",admin:admin,token:token})

            }else{
               return res.json({message:"invalid username or password"})
            }
        }else{
            return res.json({message:"invalid username or password"})
        }
        
            
        }


    catch(err){
        return res.status(500).json(err.message)
    }

}

const uploadprofession = async(req,res)=>{
    const {name,description,image}=req.body;
    let imagePath;
    let filename;
    console.log(req.file);
    
    try{
    if(req.file){
     imagePath = req.file.path;
     const profession = new Profession({
        name:name,
        description:description,
        image:imagePath

    })
    await profession.save();
    res.json({message:"Profession uploaded successfully"})

    }else{
        const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
        console.log(imageBuffer);
        const timestamp = Date.now();
         filename = `professionimage_${timestamp}.jpg`;
        
        const destination = `./public/uploads`;
        const imagePath = `${destination}/${filename}`;
        console.log(imagePath);
      
        fs.writeFileSync(imagePath, imageBuffer);
        
        const profession = new Profession({
            name:name,
            description:description,
            image:filename
    
        })
       
        await profession.save();
        res.json({message:"Profession uploaded successfully"})

    }
    
   
 

   
   

   }catch(error){
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        res.json({ message: 'Duplicate profession name encountered' });
    } else {
        console.error('Error saving profession:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

   }

   

    }

    const getusers=async(req,res)=>{
        try{
            
                const userlist = await User.find();
                return res.json({message:"userlist is here",userlist:userlist})
            

        }catch(error){
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });

        }

    }
    const getworkers=async(req,res)=>{
       
        try{
            const workerlist = await Worker.find();
             return res.json({message:"workerlist is here",workerlist:workerlist})
        
        }catch(error){
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });

        }

    }

    const getprofessions=async(req,res)=>{
        try{
            const professionlist=await Profession.find({deleted:false});
           return  res.json({message:"professionlist is here",professionlist:professionlist})


        }catch(error){
            console.error('Error:', error);
           return res.status(500).json({ error: 'Internal server error' });
        }
    }
    const getprofession =async(req,res)=>{
        try{
            const {professionid} = req.query;
            const profession = await Profession.findOne({_id:professionid})
            return res.json(profession)

        }catch(err){
            console.log(err);
        }
    }

    const editprofession = async(req,res)=>{
        try{
            
            const {name,description}=req.body;
            const {professionid}=req.query;
            console.log(professionid);
            if(req.file){
                const imagePath = req.file.filename;
                const profession = await Profession.findOne({_id:professionid})
                profession.name=name;
                profession.description=description;
                profession.image=imagePath
                await profession.save();
                 return res.json({message:"saved changes"})
            }else{
                const profession = await Profession.findOne({_id:professionid})
                profession.name=name;
                profession.description=description;
                console.log("dey"+profession);
                await profession.save();
                 return res.json({message:"saved changes"})

            }

        }catch(err){
            console.log(err);
        }
    }

    const deleteprofession = async(req,res)=>{
        try{
           
            const professionid =req.params.professionid;
            
            await Profession.findByIdAndUpdate(professionid,{$set:{deleted:true}})
            const profession= await Profession.find()
            return res.json(profession)
          
        }catch(err){

        }
    }
   
    
    const uploadbanner= async(req,res)=>{
        try{
            console.log('hello');
            const {name}=req.body;
          const  imagePath = req.file.filename;
            
            const banner = new Banner({
                name:name,
                image:imagePath
                
        
            })
            await banner.save();
            return res.json({message:"Banner uploaded successfully"})


        }catch(error){
            console.error('Error fgfdgfdg:', error.message);
            res.status(500).json({ error: error.message });

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

    const profilelist = async(req,res)=>{
        try{
            const profilelist = await Worker.find({isverified:"pending",isprofilecreated:true});
            console.log(profilelist);
            if(profilelist){
                return res.json(profilelist)
            }else{
                return res.json({message:"No other profiles"})
            }
          

        }catch(err){
            console.log(err);

        }
    }
    const verifyprofile = async(req,res)=>{
        try{
            const id = req.params.id
            const verifiedprofile = await Worker.findOne({_id:id});
            console.log(verifiedprofile);
            verifiedprofile.isverified="verified";
            const email=verifiedprofile.email
            await verifiedprofile.save()
            if(verifiedprofile){
                const transporter = nodemailer.createTransport({
                    service: 'Gmail', 
                    auth: {
                      user: 'ajsalsalim251@gmail.com',
                      pass: 'dqqzpqgtspmwzyuf'
                    }
                  });
                  const mailOptions = {
                    from: 'ajsalsalim251@gmail.com',
                    to: email,
                    subject: 'profile verification',
                    text: "your profile is approved and you can explore the app"
                  };
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.error(error);
                      return res.status(500).json({ message: 'Failed to send OTP' });
                    }
                
                    console.log('OTP sent:', info.response);
                  });
                return res.json({message:"profile verified successfully"})
            }else{
                return res.json({message:"No such email exist"})
            }
          

        }catch(err){
            console.log(err);

        }
    }

    const rejectprofile= async(req,res)=>{
        try{
            const id = req.params.id
            const reason = req.params.reason
            const rejectedprofile = await Worker.findOne({_id:id});
            console.log(rejectedprofile);
            rejectedprofile.isverified="rejected"
            const email=rejectedprofile.email;
             rejectedprofile.gender=undefined;
             rejectedprofile.location=undefined;
             rejectedprofile.profession=[];
             rejectedprofile.timepreference=undefined;
             rejectedprofile.availability=false
             rejectedprofile.isprofilecreated=false
             rejectedprofile.profilepicture=""
            console.log(rejectedprofile);

            await rejectedprofile.save()
            const transporter = nodemailer.createTransport({
                service: 'Gmail', 
                auth: {
                  user: 'ajsalsalim251@gmail.com',
                  pass: 'dqqzpqgtspmwzyuf'
                }
              });
              const mailOptions = {
                from: 'ajsalsalim251@gmail.com',
                to: email,
                subject: 'profile verification',
                text: `your profile is rejected due to ${reason}`
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                  return res.status(500).json({ message: 'Failed to send OTP' });
                }
            
                console.log('OTP sent:', info.response);
              });
            return res.json({message:"profile rejected successfully"})


        }
        catch(err){
            
        }
    }
    const blockuser = async(req,res)=>{
        try{
            const userId= req.params.userId;
            console.log(userId);
            const user = await User.findOne({_id:userId})
            console.log(user);
            user.isblocked=true;
            await user.save();
            return res.json({message:"blocked successfully"})

        }catch(err){

        }

    }
    const unblockuser = async(req,res)=>{
        try{
            const userId= req.params.userId;
            console.log(userId);
            const user = await User.findOne({_id:userId})
            console.log(user);
            user.isblocked=false;
            await user.save();
            return res.json({message:"unblocked succesfully"})

        }catch(err){

        }
    }
    const blockworker = async(req,res)=>{
        try{
            const workerId= req.params.workerId;
            console.log(workerId);
            const worker = await Worker.findOne({_id:workerId})
            console.log(worker);
            worker.isblocked=true;
            await worker.save();
            return res.json({message:"blocked successfully"})

        }catch(err){

        }
    }


    const unblockworker = async(req,res)=>{
        try{
            const workerId= req.params.workerId;
            console.log(workerId);
            const worker = await Worker.findOne({_id:workerId})
            console.log(worker);
            worker.isblocked=false;
            await worker.save();
            return res.json({message:"unblocked successfully"})

        }catch(err){

        }
    }



exports.login = login
exports.uploadprofession=uploadprofession
exports.getusers=getusers
exports.getworkers=getworkers
exports.getprofessions=getprofessions
exports.getprofession=getprofession
exports.editprofession=editprofession
exports.deleteprofession=deleteprofession
exports.getbanners=getbanners
exports.uploadbanner=uploadbanner
exports.profilelist=profilelist
exports.verifyprofile=verifyprofile
exports.rejectprofile=rejectprofile
exports.blockuser=blockuser
exports.unblockuser=unblockuser
exports.blockworker=blockworker
exports.unblockworker=unblockworker