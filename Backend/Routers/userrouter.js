const express = require("express");
const multer = require('multer');
const {signup,
  login,
  forgotpassword,
  changepassword,
  getprofessions,
  getbanners,
  getcredentials,
  getusercreds,
  profilesetup,
  userprofilesetup,
  edituser,
  editworker,
  workerprofile,
  workerfeedback,
  workersearch,
  bookservice,
  getappointments,
  bookingdetails,
  userbooking,
  updatebooking,
} = require("../Controllers/usercontroller")
const {otp} = require("../Middlewares/otp")
const path = require("path");
const { verifyToken } = require("../Middlewares/verifytoken");

const userrouter = express.Router();

let Storage = multer.diskStorage({

    destination: "./public/uploads/",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  let upload = multer({
    storage: Storage,fileFilter: function (params, file, callback) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"|| file.mimetype== "image/avif") {
          console.log("asdfsaf");
          callback(null, true)
        } else {
          console.log('only jpg & png file supported !');
          callback(null, false)
  }
  }
  })


userrouter.post("/signup",otp,signup)
userrouter.post("/login",login)
userrouter.post("/forgotpassword",forgotpassword)
userrouter.post("/changepassword",changepassword)
userrouter.get("/professions",getprofessions)
userrouter.get("/banners",getbanners)
userrouter.get("/getcredentials",verifyToken,getcredentials)
userrouter.get("/getusercreds",verifyToken,getusercreds)
userrouter.post("/profilesetup",verifyToken,upload.single("profilepicture"),profilesetup)
userrouter.post("/userprofile",verifyToken,upload.single("profilepicture"),userprofilesetup)
userrouter.post("/edituser",verifyToken,upload.single("profilepicture"),edituser)
userrouter.post("/editworker",verifyToken,upload.single("profilepicture"),editworker)
userrouter.get("/workerprofile/:id",verifyToken,workerprofile)
userrouter.post("/workerfeedback",verifyToken,workerfeedback)
userrouter.get("/search",verifyToken,workersearch)
userrouter.post("/bookservice",verifyToken,bookservice)
userrouter.get("/appointments",verifyToken,getappointments)
userrouter.get("/bookingdetails",verifyToken,bookingdetails)
userrouter.get("/userbooking",verifyToken,userbooking)
userrouter.get("/updatebooking",verifyToken,updatebooking)


module.exports=userrouter