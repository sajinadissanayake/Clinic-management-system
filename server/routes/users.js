const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		const Email = req.body.email;
		const nic = req.body.nic;
		const utype= req.body.utype;

		const user = await User.findOne({ nic: req.body.nic });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given nic already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		// Save user to database
		await new User({ ...req.body, password: hashPassword }).save();

		// Sending email to the user
		const transporter = nodemailer.createTransport({
			service: 'Gmail', // e.g., Gmail
			auth: {
				user: 'clinichealthylifestyle@gmail.com',
                    pass: 'idhz qmax uihy qhjq'
			}
		});

		const mailOptions = {
			from: 'clinichealthylifestyle@gmail.com',
			to: Email,
			subject: 'Your Account Information',
			text: `Hello,\n\nYour Have Successfully Registered as a ${utype} .\n\nNIC: ${nic}\nPassword: ${req.body.password}\n\nThank you.`
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
				res.status(500).send({ message: "Failed to send email" });
			} else {
				console.log('Email sent: ' + info.response);
				res.status(201).send({ message: "User created successfully and email sent" });
			}
		});

	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
