const User = require('../models/usermodel')
const nodemailer = require('nodemailer')
const { Password, Email } = require('../utils/config')
const bcrypt = require('bcrypt')

const passcontroller = {
    forgetPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.find({ email })

            if (!user.length > 0) {
                return res.status(404).json({ message: "No User found for current Email" })
            }

            const random = () => {
                const Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';

                for (let i = 0; i < 10; i++) {
                    result += Characters.charAt(Math.floor(Math.random() * Characters.length))
                }
                return result;
            }

            const randomString = random();

            user[0].resetPasswordToken = randomString;
            user[0].resetPasswordExpires = Date.now() + 3600000;

            await user[0].save()


            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${Email}`,
                    pass: `${Password}`
                }
            });

            const mailOptions = {
                from: `${Email}`,
                to: `${email}`,
                subject: 'Reset password',
                html: `<p>You requested a password Reset.Click the below link to reset your Password:</p> 
                <a href="https://resetpasswordpage.netlify.app/passwordchange/${randomString}">Reset Password</a>
                <p>If you dint request for a password change..Kindly Ignore this email</p>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error sending email", error.message)
                } else {
                    console.log("Email sent:", info.response);
                    return res.status(200).json({ message: "Password reset link send to your email", string: randomString })
                }

            })

        } catch (error) {
            res.status(500).json({ message: "Essue changing password try later", error: error.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body;
            const token = req.params.token;

            
            const user = await User.findOne({ resetPasswordToken: token,resetPasswordExpires: { $gt: Date.now() }})

            if(!user){
                return res.status(404).json({message:"No user found or Token does not match"})
            }
            const hashPassword = await bcrypt.hash(password, 10);

            user.password = hashPassword;

            user.resetPasswordExpires = undefined;
            user.resetPasswordToken = undefined;

            await user.save();



            res.status(200).json({ message: "password changed successfully" })
        } catch (error) {
            res.status(500).json({message:"error changing password",error:error.messgae})
            
        }

    }
}

module.exports = passcontroller