require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const Password = process.env.PassWord;
const Email = process.env.Email;

module.exports = {MONGODB_URI,PORT,Password,Email}