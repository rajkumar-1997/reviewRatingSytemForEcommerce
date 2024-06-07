const express = require('express');
const ReviewController = require('../controllers/reviewController');
const Authentication = require('../middlewares/authMiddleware');
const MulterConfig = require('../middlewares/fileMiddleware');
class ReviewRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(
      '/addReviewToProduct',
      Authentication.authenticate,
      Authentication.isUser,
      MulterConfig.getUploadMiddleware().single('file'),
      ReviewController.addReviewToProduct
    );
    this.router.post(
      '/addReviewToFeature',
      Authentication.authenticate,
      Authentication.isUser,
      ReviewController.addReviewToFeature
    );
    this.router.get(
      '/getMyReviews',
      Authentication.authenticate,
      Authentication.isUser,
      ReviewController.getMyReviews
    );
    this.router.get(
      '/getReviewsByProduct/:productId',
      Authentication.authenticate,
      Authentication.isUser,
      ReviewController.getReviewsByProduct
    );
    this.router.get(
      '/getReviewsByFeature/:featureId',
      Authentication.authenticate,
      Authentication.isUser,
      ReviewController.getReviewsByFeature
    );
    this.router.get(
      '/getTopRatedReviews',
      Authentication.authenticate,
      Authentication.isUser,
      ReviewController.getTopRatedReviews
    );
    this.router.get(
      '/sortReviewsByDate',
      Authentication.authenticate,
      Authentication.isUser,
      ReviewController.sortReviewsByDate
    );
    this.router.get(
      '/getCertifiedReviews',
      Authentication.authenticate,
      Authentication.isUser,
      ReviewController.getCertifiedReviews
    );
    this.router.get(
      '/getReviewsWithImages',
      Authentication.authenticate,
      Authentication.isUser,
      ReviewController.getReviewsWithImages
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ReviewRoutes().getRouter();
