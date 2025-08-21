const express = require('express');
const passRouter = require('./routers/passRouter');
const logger = require('./utils/logger');
const error = require('./utils/error');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);

app.use('/api/v1',passRouter)

app.use(error);

module.exports = app;