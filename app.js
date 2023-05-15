const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require("fs")

const multer = require('multer');

const upload = multer({ dest: 'upload/' });// specify the directory where uploaded files will be stored
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.sendFile(__dirname+ "/public/index.html");
    
})


console.log(__dirname+ "/public/index.html");

app.post("/submit-contact-form",(req,res)=>{

    const {name, phone, email, message} = req.body;

    const mailOptions = {
        from: 'erakash7566@gmailcom',
        to: 'erak942@gmail.com',
        subject: 'New form submission on contact us from.',
        html: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>phone: ${phone}</p>
          <p>Message: ${message}</p>
        `
      };

    
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      

      res.redirect('/');

})

app.post("/submit-job-form", upload.single('file'), (req,res)=>{
    // console.log('Uploaded file:', req.file)

    
  

    const {name, phone, email, status, experience, details, } = req.body;
    const mailOptions = {
        from: 'erakash7566@gmailcom',
        to: 'erak942@gmail.com',
        subject: 'New Job Application.',
        html: `
          <p>Name: ${name}</p>
          <p>phone: ${phone}</p>
          <p>Email: ${email}</p>
          <p>status: ${status}</p>
          <p>Experience : ${experience}</p>
          <p>details : ${details}</p>
          
        `,

        attachments: [
            {
                filename: req.file.originalname,
                path: req.file.path
               
            }
          ]
      };

    
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });



    res.sendFile(__dirname+ "/public/thanks.html");
   

})


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'erakash7566@gmail.com',
    pass: 'daqtqykyiptnnxjv'
  }
});




app.listen(PORT, ()=>{
    console.log("Server is running on port 3000");
})