const express = require('express');
const passRouter = require('./routers/passRouter');
const logger = require('./utils/logger');
const error = require('./utils/error');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5174', 
  credentials: true, 
};

app.use(cors(corsOptions));
// app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(logger);

app.use('/api/v1/',passRouter)


app.use(error);

module.exports = app;