const mongoose = require('mongoose');
const { Schema } = mongoose;

class ReviewSchema {
  constructor() {
    this.schema = new Schema(
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        feature: { type: mongoose.Types.ObjectId },
        rating: { type: Number, required: true },
        reviewText: { type: String, required: true },
        image: { type: String },
        certified: { type: Boolean, default: false },
      },
      { timestamps: true }
    );
  }

  getModel() {
    return mongoose.model('Review', this.schema);
  }
}

const ReviewModel = new ReviewSchema().getModel();
module.exports = ReviewModel;
