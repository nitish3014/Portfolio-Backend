// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nitish1dalvi@gmail.com', // Your Gmail username
    pass: 'cxvb csom eutv dvht'      // Your Gmail password/token
  }
});

// POST endpoint to send email
app.post('/send-email', (req, res) => {
  console.log("Received request body:", req.body); // Debug log

  const { name, email, phone, message } = req.body;
  
  // Validate that all fields are provided
  if (!name || !email || !phone || !message) {
    console.error("Validation failed: One or more fields are missing.");
    return res.status(400).send('All fields are required.');
  }

  // Build the email options including the phone field
  const mailOptions = {
    from: 'nitish1dalvi@gmail.com',         // Sender email
    to: 'nitish1dalvi@gmail.com',           // Receiver email
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Message:</strong> ${message}</p>`
  };

  // Log mailOptions for debugging
  console.log("Sending email with options:", mailOptions);

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).send('Error occurred while sending email.');
    }
    console.log('Email sent successfully:', info.response);
    res.status(200).send('Email sent successfully!');
  });
});

// Serve a simple HTML page for testing
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Status</title>
    </head>
    <body>
      <h1>Server running on port ${process.env.PORT || 5000}</h1>
    </body>
    </html>
  `);
});

// Use a default port if process.env.PORT is not set
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
