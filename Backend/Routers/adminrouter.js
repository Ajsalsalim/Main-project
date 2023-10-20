const express = require("express");
const multer = require('multer');


const {
  login,
  uploadprofession,
  getusers,
  getworkers,
  getprofessions,
  getprofession,
  editprofession,
  deleteprofession,
  uploadbanner,
  getbanners,
  profilelist,
  verifyprofile,
  rejectprofile,
  blockuser,
  unblockuser,
  blockworker,
  unblockworker
} = require("../Controllers/admincontroller")
const path = require("path");
const {verifyToken}= require("../Middlewares/verifytoken")

const adminrouter = express.Router();
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


adminrouter.post("/adminlogin",login)
adminrouter.get("/getusers",verifyToken,getusers)
adminrouter.get("/getworkers",verifyToken,getworkers)
adminrouter.get("/getprofessions",verifyToken,getprofessions)
adminrouter.get("/getprofession",verifyToken,getprofession)
adminrouter.post("/editprofession",verifyToken,upload.single("image"),editprofession)
adminrouter.delete("/deleteprofession/:professionid",verifyToken,deleteprofession)
adminrouter.get("/getbanners",verifyToken,getbanners)
adminrouter.get("/profilelist",verifyToken,profilelist)
adminrouter.get("/verifyprofile/:id",verifyToken,verifyprofile)
adminrouter.get("/rejectprofile/:id/:reason",verifyToken,rejectprofile)
adminrouter.post("/uploadprofession",verifyToken,upload.single("image"),uploadprofession)
adminrouter.post("/uploadbanner",upload.single("image"),uploadbanner)
adminrouter.post("/blockuser/:userId",verifyToken,blockuser);
adminrouter.post("/unblockuser/:userId",verifyToken,unblockuser)
adminrouter.post("/blockworker/:workerId",verifyToken,blockworker);
adminrouter.post("/unblockworker/:workerId",verifyToken,unblockworker)


module.exports=adminrouter
