'use strict';

const bcrypt = require('bcrypt');

const userModel = (sequelizeDatabase, DataTypes) => {
  const users = sequelizeDatabase.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  users.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  return users;
};

module.exports = userModel;