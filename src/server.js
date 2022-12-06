'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
const authRouter = require('./auth/router');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(authRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!!!!');
});


// Error Handlers
app.use('*', notFound);
app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('listening on port' , PORT));
}

module.exports = { start, app };