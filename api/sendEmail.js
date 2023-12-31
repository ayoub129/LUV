const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001; // Choose the port you want to use

const corsOptions = {
  origin: 'https://luvofficial.vercel.app',
  methods: 'POST',
  allowedHeaders: '*',
};

app.use(cors(corsOptions));

// Middleware to parse JSON data
app.use(bodyParser.json());

// Define your API endpoint
app.post('/api/sendEmail', cors(corsOptions),   (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://luvofficial.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  const { sceneNameWithoutExtension, size, details } = req.body;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });


  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.EMAIL_DESTINATION1}, ${process.env.EMAIL_DESTINATION2} ,  ${process.env.EMAIL_DESTINATION3}`, // Add the second email address here
    subject: 'New Payment Success',
    html: `
      <p>Color: ${sceneNameWithoutExtension}</p>
      <p>Size: ${size}</p>
      <p>Details: ${JSON.stringify(details)}</p>
    `,
  };


  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Error sending email' });
    }
    res.status(200).json({ message: 'Email sent successfully', info  });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
