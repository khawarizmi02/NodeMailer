const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

require('dotenv').config()

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const USER_EMAIL = process.env.USER;
const USER_PASSWORD = process.env.GOOGLE_APPLICATION_PASSWORD;

console.log(USER_EMAIL)
console.log(USER_PASSWORD)

app.post('/send-email', async (req, res) => {
	const { name, email, subject, message } = req.body;

	// Create a transporter
	const transporter = nodemailer.createTransport({
		service: 'gmail', // or another email service
		auth: {
			user: USER_EMAIL, // Replace with your email
			pass: USER_PASSWORD, // Use an App Password for security
		},
	});

	// Email options
	const mailOptions = {
		from: USER_EMAIL, // Sender's email
		to: email, // Your email to receive messages
		subject: subject || 'No Subject',
		text: `From: ${name} <${email}>\n\n${message}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: 'Email sent successfully!' });
	} catch (error) {
		console.error('Error sending email:', error);
		res.status(500).json({ message: 'Failed to send email' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
