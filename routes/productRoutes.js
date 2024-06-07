const express = require('express');
const ProductController = require('../controllers/prodcutController');
const Authentication = require('../middlewares/authMiddleware');
class ProductRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(
      '/addProduct',
      Authentication.authenticate,
      Authentication.isSeller,
      ProductController.addProduct
    );
    this.router.get(
      '/getAllProducts',
      Authentication.authenticate,
      ProductController.getAllProducts
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ProductRoutes().getRouter();
