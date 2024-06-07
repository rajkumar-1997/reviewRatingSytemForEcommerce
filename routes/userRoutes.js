const express = require('express');
const UserController = require('../controllers/userController');

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post('/signup', UserController.signUp);
    this.router.post('/login', UserController.login);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new UserRoutes().getRouter();
