const express = require("express");
const ejs = require("ejs");
//const fs = require("fs");
const multer = require("multer");
const path = require('path');

const app = express();
const port = 5000;

// var storage=multer.diskStorage({
//     destination:function(req,file,callback){
//         var dir="./uploads";
//         if(!fs.existsSync(dir))
//         {
//             fs.mkdirSync(dir);
//         }
//         callback(null,dir);
//     },
//     filename:function(req,file,callback){
//         callback(null,file.originalname);
//     }
// });
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads/');
    // },
    destination : './uploads',

    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
});
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'files/jpeg' || file.mimetype == 'files/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
const upload = multer({ storage: storage}).array('files',10);
// var upload = multer({storage:storage}).array('files',12);
// app.post('/upload',(req,res,next)=>{
//     upload(req,res,function(err){
//         if(err)
//     {
//         return res.send("something went wrong!!");
//     }
//     res.send("Uploading file Successfully..");
//     })
// })
//Upload route
app.post('/upload', (req, res) => {
    try {
        console.log(req.files);
        upload(req,res,function(err) {
            if(err) {
                console.log("inside if");
                res.send(err)
                
            }
            else {
                console.log("inside elseif");  
                res.send("successfully")
            }
        })
        //  res.status(201).json({
        //     message: 'File uploded successfully'
        // });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
// const express = require('express');
// const multer = require("multer");
// const path = require('path');
// const app = express();
// const pat = './upload'
// const fs = require('fs');
// const storage = multer.diskStorage({
//     destination : pat,
//     filename : (req,file,cd) => {
//         return cd(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     },
// })
// const upload= multer({ 
//     storage :storage,
//     fileFilter: function(req,file,cb){
//         checkfiletype(file,cb)
//     } 
// }).single('profile')
// function checkfiletype(file,cb){
//     const filetype = /jpeg|jpg|png/;
//     const extname = filetype.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetype.test(file.mimetype);
//     if(file==null){
//         console.log("select file")
//     }
//     if(mimetype && extname){
//         return cb(null,true);  
//     }else{ 
//         cb('images only');    
//     }
// }
// app.post("/upload",(req,res)=>{ 
//     upload(req,res,(err) => {
//         if (err){
//             res.send(err)
//         }
//         else{ 
//             res.json({
//                 success:1,
//                 profile_url:`http://localhost:5000/profile/${req.file.filename}`
//             })
//         }
//     })
// })
// app.listen(5000,()=>{
//     console.log("server is running")
// })