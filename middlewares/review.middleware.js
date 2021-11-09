const {
    errorMessages,
    errorStatuses,
    itemTypes
} = require('../constants');

const {Review} = require('../models');
const {s3Service} = require('../services');

module.exports = {
    checkReviewIdAndFoundPlace: async (req, res, next) => {
        try {
            const {params: {reviewId}} = req;

            const foundReview = await Review
                .findById(reviewId)
                .lean();

            if (!foundReview) {
                return next({
                    message: errorMessages.REVIEW_ID_DOESNT_EXIST,
                    status: errorStatuses.code_404
                });
            }

            req.foundReview = foundReview;

            next();
        } catch (e) {
            next(e);
        }
    },

    uploadReviewPhoto: async (req, res, next) => {
        try {
            const {
                files: {photo},
                foundUser: {_id}
            } = req;

            const uploadInfo = await s3Service.uploadImage(
                photo,
                itemTypes.REVIEWS,
                _id.toString()
            );

            req.body = {newReviewPhoto: uploadInfo.Location};

            next();
        } catch (err) {
            next(err);
        }
    }
};
