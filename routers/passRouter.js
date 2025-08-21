const express = require('express');
const { forgetPassword,resetPassword } = require('../controllers/passcontroller');

const passRouter = express.Router();

passRouter.post('/forget-password',forgetPassword)
passRouter.post('/reset-password/:token',resetPassword)
module.exports = passRouter;