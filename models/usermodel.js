const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date

},{timestamps:true})

module.exports = mongoose.model('User', userSchema, 'Users');