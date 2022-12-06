'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users-model');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory:'
  : process.env.DATABASE_URL || 'postgres://localhost:5432/api-app-auth';

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const userModel = userSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  userModel,
};