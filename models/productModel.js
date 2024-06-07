const mongoose = require('mongoose');
const { Schema } = mongoose;

const featureSchema = new Schema({
  name: { type: String, required: true },
  overallRating: { type: Number, default: 0 },
});

class ProductSchema {
  constructor() {
    this.schema = new Schema(
      {
        name: { type: String, unique: true, required: true },
        description: { type: String, required: true },
        features: [featureSchema],
        overallRating: { type: Number, default: 0 },
      },
      { timestamps: true }
    );
  }

  getModel() {
    return mongoose.model('Product', this.schema);
  }
}

const ProductModel = new ProductSchema().getModel();
module.exports = ProductModel;
