const express = require('express');
const { forgetPassword,resetPassword } = require('../controllers/passcontroller');
const { register, login, logout } = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/auth');


const passRouter = express.Router();

passRouter.post('/forget-password',forgetPassword)
passRouter.post('/reset-password/:token',resetPassword)
passRouter.post('/register', register);
passRouter.post('/login',login);
passRouter.post('/logout',isAuthenticated,logout)

module.exports = passRouter;