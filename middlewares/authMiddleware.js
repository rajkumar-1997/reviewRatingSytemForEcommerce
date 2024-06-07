const UserModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const envConfig = require('../config/envConfig');
const jwtKey = envConfig.getJwtKey();
class Authentication {
  constructor() {}
  async authenticate(req, res, next) {
    try {
      const token = req.header('Authorization');
      if (!token) throw new Error('Token not provided');
      const { _id } = jwt.verify(token, jwtKey);
      const user = await UserModel.findById(_id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).send({ message: 'Authorization Failed!' });
      }
    } catch (error) {
      res.status(401).send({ message: 'Authorization Failed!' });
    }
  }
  async isUser(req, res, next) {
    try {
      if (req.user && req.user.role === 'USER') {
        next();
      } else {
        res.status(403).send({ message: 'Access forbidden.' });
      }
    } catch (error) {
      res.status(401).send({ message: 'Authorization Failed!' });
    }
  }

  async isSeller(req, res, next) {
    try {
      if (req.user && req.user.role === 'SELLER') {
        next();
      } else {
        res.status(403).send({ message: 'Access forbidden.' });
      }
    } catch (error) {
      res.status(401).send({ message: 'Authorization Failed!' });
    }
  }
}

module.exports = new Authentication();
