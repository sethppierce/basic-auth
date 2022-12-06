'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {userModel} = require('../models');

module.exports = async (req, res, next) => {

  let { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send('Not Authorized!');
  } else {
    let basicHeaderParts = authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password

    try {
      const user = await userModel.findOne({ where: { username} });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        res.status(200).json(user);
      }
      else {
        throw new Error('Invalid User');
      }
    } catch (error) { next(error); }
  }
};
