const reviewRouter = require('express').Router();

const {endPoints} = require('../constants');
const {reviewController} = require('../controllers');

const {
    accessMiddleware,
    authMiddleware,
    reviewMiddleware,
    validatorMiddleware
} = require('../middlewares');

const {reviewValidator} = require('../validators');

reviewRouter.get(
    '/',
    accessMiddleware.checkReviewEndpointPermissions(endPoints.GET_REVIEWS),
    reviewController.getReviews
);
reviewRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(reviewValidator.createGuestReview),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkReviewEndpointPermissions(endPoints.CREATE_GUEST_REVIEW),
    reviewController.createGuestReview
);
reviewRouter.put(
    '/',
    validatorMiddleware.isBodyValidate(reviewValidator.createHolderReview),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkReviewEndpointPermissions(endPoints.CREATE_HOLDER_REVIEW),
    reviewController.createHolderReview
);

reviewRouter.get(
    '/:reviewId',
    reviewMiddleware.checkReviewIdAndFoundPlace,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.GET_REVIEW_BY_ID),
    reviewController.getReviewById
);
reviewRouter.delete(
    '/:reviewId',
    authMiddleware.checkAccessToken,
    reviewMiddleware.checkReviewIdAndFoundPlace,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.DELETE_REVIEW),
    reviewController.deleteReview
);
reviewRouter.post(
    '/:reviewId/data',
    validatorMiddleware.isBodyValidate(reviewValidator.changeDataReviewForManager),
    authMiddleware.checkAccessToken,
    reviewMiddleware.checkReviewIdAndFoundPlace,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.CHANGE_REVIEW_DATA),
    reviewController.updateReview
);

module.exports = reviewRouter;
