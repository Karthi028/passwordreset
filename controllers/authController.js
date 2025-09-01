const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const usermodel = require('../models/usermodel');
const { JWT_SECRET } = require('../utils/config');

const authController = {

    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const exisingUser = await usermodel.find({ email });

            if (exisingUser.length > 0) {
                return res.status(400).json({ message: 'User exist already' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new usermodel({
                name,
                email,
                password: hashedPassword
            });

            await newUser.save();

            res.status(201).json({ message: "Registered succesfully" });

        } catch (error) {
            res.status(500).json({ message: "Registration failed", error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await usermodel.find({ email });
            if (user.length === 0) {
                return res.status(400).json({ messahe: 'User already Exist' });
            }

            const isPasswordValid = await bcrypt.compare(password, user[0].password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid Password" })
            }

            const jwtToken = JWT.sign({ id: user[0]._id }, JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token',jwtToken,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                domain:'resetpasswordpage.netlify.app'

            })

            res.status(200).json({ message: "Login Succesfull"});
        } catch (error) {
            res.status(500).json({ message: "login failed", error: error.message })
        }
    },
    me: async (req, res) => {
        try {
            const userId = req.userId;

            const user = await usermodel.findById(userId);

            if (!user) {
                return res.status(400).json({ message: "No User Found" });
            }

            res.status(200).json({ User: user });
        } catch (error) {
            res.status(500).json({ message: "Error fetching User data", error: error.message })
        }
    },
    logout: async (req,res)=>{
        try {
            const token = req.cookies.token;

            res.clearCookie('token')

            res.status(200).json({message:"Logout Successfull"})
        } catch (error) {
            res.status(500).json({message:'Error logging out',error:error.message})
        }
    }

}

module.exports = authController;