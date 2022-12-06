'use strict';

const express = require('express');

const {userModel} = require('./models');

const router = express.Router();
const basicAuth = require('./middleware/basic');

router.post('/signup', async (req, res) => {
  try {
    const record = await userModel.create(req.body);
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User'); 
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = router;
