const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envConfig = require('../config/envConfig');
const jwtKey = envConfig.getJwtKey();
const saltRounds = 10;

class UserController {
  constructor() {}
  async signUp(req, res) {
    try {
      let { username, password, role } = req.body;
      if (!username || !password || !role) {
        return res.status(400).send({ message: 'Required parameter missing' });
      }
      const user = await UserModel.findOne({ username });
      if (user) {
        return res.status(409).send({ message: 'User Already Exists!' });
      } else {
        const hash = await bcrypt.hash(password, saltRounds);
        role = role.toUpperCase();
        await UserModel.create({ username, password: hash, role });
        res.status(200).send({ message: 'user created successfully' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).send({ message: 'Required parameter missing' });
      }
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(404).send({ message: 'User not found!' });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).send({ message: 'Internal server error' });
          }
          if (result == true) {
            const token = jwt.sign(
              { _id: user._id, username: user.username },
              jwtKey
            );
            res
              .status(200)
              .send({ message: 'logged in successfully', sessionToken: token });
          } else {
            res.status(403).send({ message: 'password is incorrect' });
          }
        });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
