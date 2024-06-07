const ProductModel = require('../models/productModel');

class ProductController {
  constructor() {}
  async addProduct(req, res) {
    try {
      const { name, description, features } = req.body;
      if (!name || !description || !Array.isArray(features)) {
        return res.status(400).send({ message: 'Required parameter missing' });
      }
      const product = await ProductModel.findOne({ name });
      if (product) {
        return res.status(409).send({ message: 'Product Already Exists!' });
      } else {
        // Create a new product with features
        const product = await ProductModel.create({
          name,
          description,
          features: features.map((feature) => {
            return { name: feature };
          }),
        });
        res
          .status(200)
          .send({ message: 'Product added successfully', product });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await ProductModel.find({});
      res.status(200).send({ message: 'All Products', products });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}

module.exports = new ProductController();
