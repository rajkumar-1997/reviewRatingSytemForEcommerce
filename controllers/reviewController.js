const ReviewModel = require('../models/reviewModel');
const ProductModel = require('../models/productModel');
const S3Uploader = require('../services/s3service');
const fs = require('fs');
class ReviewController {
  constructor() {}
  async addReviewToProduct(req, res) {
    try {
      const { userId, productId, rating, reviewText, certified } = req.body;
      if (!userId || !productId || !rating || !reviewText) {
        return res.status(400).send({ message: 'Required parameter missing' });
      }

      const uploadedFile = req?.file;
      if (!uploadedFile) {
        return res.status(400).send({ message: 'No file uploaded' });
      }

      // Check if uploaded file is  image
      if (!uploadedFile.mimetype.startsWith('image')) {
        return res
          .status(400)
          .send({ message: 'Only image files are allowed' });
      }
      const product = await ProductModel.findById(productId);
      if (!product)
        return res.status(404).send({ message: 'Product not found' });

      const isReviwAlreadyDone = await ReviewModel.findOne({
        user: userId,
        product: productId,
        feature: null,
      });
      if (isReviwAlreadyDone)
        return res
          .status(409)
          .send({ message: 'Review already added for this product' });
      const fileName = uploadedFile.originalname;
      const path = uploadedFile.path;
      const s3FileUrl = await S3Uploader.uploadImageToS3(path, fileName);

      fs.unlinkSync(path);
      const createdReview = await ReviewModel.create({
        user: userId,
        product: productId,
        rating,
        reviewText,
        certified,
        image: s3FileUrl,
      });

      // Calculate new overall rating for the product
      const productReviews = await ReviewModel.find({
        product: productId,
        feature: null,
      });
      const totalReviews = productReviews.length;
      const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / totalReviews;

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        { overallRating: averageRating },
        { new: true }
      );
      res.status(200).send({
        message: 'Review added successfully for product',
        createdReview,
        updatedProduct,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  async addReviewToFeature(req, res) {
    try {
      const { userId, productId, rating, reviewText, featureId } = req.body;
      if (!userId || !productId || !rating || !reviewText || !featureId) {
        return res.status(400).send({ message: 'Required parameter missing' });
      }

      const product = await ProductModel.findById(productId);
      if (!product)
        return res.status(404).send({ message: 'Product not found' });
      const feature = product.features.id(featureId);
      if (!feature)
        return res.status(404).send({ message: 'feature not found' });

      const isReviwAlreadyDone = await ReviewModel.findOne({
        user: userId,
        product: productId,
        feature: featureId,
      });
      if (isReviwAlreadyDone)
        return res
          .status(409)
          .send({ message: 'Review already added for this feature' });

      const createdReview = await ReviewModel.create({
        user: userId,
        product: productId,
        feature: featureId,
        rating,
        reviewText,
      });
      // Calculate new overall rating for the feature
      const featureReviews = await ReviewModel.find({ feature: featureId });
      const totalReviews = featureReviews.length;
      const totalRating = featureReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / totalReviews;

      feature.overallRating = averageRating;

      const updatedProduct = await ProductModel.updateOne(
        { _id: productId, 'features._id': featureId },
        { $set: { 'features.$.overallRating': averageRating } }
      );
      res.status(200).send({
        message: 'Review added successfully for feature',
        createdReview,
        updatedProduct,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
  async getMyReviews(req, res) {
    try {
      const userId = req.user._id;
      const myReviews = await ReviewModel.find({ user: userId });
      res.status(200).send({
        message: 'Your reviews fetched successfully',
        myReviews,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  async getReviewsByProduct(req, res) {
    try {
      const productId = req.params.productId;
      const prodcutReview = await ReviewModel.find({
        product: productId,
        feature: null,
      });
      res.status(200).send({
        message: 'Product reviews fetched successfully',
        prodcutReview,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  async getReviewsByFeature(req, res) {
    try {
      const featureId = req.params.featureId;
      const featureReview = await ReviewModel.find({
        feature: featureId,
      });
      res.status(200).send({
        message: 'Feature reviews fetched successfully',
        featureReview,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  async getTopRatedReviews(req, res) {
    try {
      const limit = req.query.limit;
      const topRatedReview = await ReviewModel.find()
        .sort({ rating: -1 })
        .limit(limit);
      res.status(200).send({
        message: 'Top rated reviews fetched successfully',
        topRatedReview,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  async sortReviewsByDate(req, res) {
    try {
      let order = req.query.order;
      order = order.toUpperCase();
      const sortOrder = order === 'ASC' ? 1 : -1;
      const sortedReviewByDate = await ReviewModel.find().sort({
        createdAt: sortOrder,
      });
      res.status(200).send({
        message: 'Sorted reviews by date fetched successfully',
        sortedReviewByDate,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  async getCertifiedReviews(req, res) {
    try {
      const certifiedReviews = await ReviewModel.find({ certified: true });
      res.status(200).send({
        message: 'Certified reviews fetched successfully',
        certifiedReviews,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  async getReviewsWithImages(req, res) {
    try {
      const reviewsWithImage = await ReviewModel.find({
        image: { $exists: true, $ne: null },
      });
      res.status(200).send({
        message: 'Reviews having image fetched successfully',
        reviewsWithImage,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}

module.exports = new ReviewController();
