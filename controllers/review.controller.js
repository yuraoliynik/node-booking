const {errorStatuses} = require('../constants');

const {
    Place,
    Review,
    User
} = require('../models');

module.exports = {
    getReviews: async (req, res, next) => {
        try {
            const foundReviews = await Review
                .find()
                .lean();

            res
                .json(foundReviews);
        } catch (e) {
            next(e);
        }
    },

    getReviewById: (req, res, next) => {
        try {
            const {foundReview} = req;

            res
                .json(foundReview);
        } catch (e) {
            next(e);
        }
    },

    createGuestReview: async (req, res, next) => {
        try {
            const {
                body,
                body: {rating, place}
            } = req;

            const createdReview = await Review.create(body);

            await Place
                .updateOne(
                    {_id: place},
                    {
                        $inc: {
                            count_votes: 1,
                            count_star: rating
                        }
                    }
                );

            res
                .status(errorStatuses.code_201)
                .json(createdReview);
        } catch (e) {
            next(e);
        }
    },

    createHolderReview: async (req, res, next) => {
        try {
            const {
                body,
                body: {rating, guest}
            } = req;

            const createdReview = await Review.create(body);

            await User
                .updateOne(
                    {_id: guest},
                    {
                        $inc: {
                            count_votes: 1,
                            count_star: rating
                        }
                    }
                );

            res
                .status(errorStatuses.code_201)
                .json(createdReview);
        } catch (e) {
            next(e);
        }
    },

    updateReview: async (req, res, next) => {
        try {
            const {params: {reviewId}, body} = req;

            const updatedReview = await Review
                .findByIdAndUpdate(
                    reviewId,
                    body,
                    {new: true, runValidators: true}
                ).lean();

            res
                .status(errorStatuses.code_201)
                .json(updatedReview);
        } catch (e) {
            next(e);
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const {params: {reviewId}} = req;

            await Review.deleteOne({_id: reviewId});

            res
                .sendStatus(errorStatuses.code_204);
        } catch (e) {
            next(e);
        }
    },

    addReviewPhoto: async (req, res, next) => {
        try {
            const {
                params: {reviewId},
                body: {newReviewPhoto},
                foundReview: {photos}
            } = req;

            const reviewPhotos = [
                ...photos,
                newReviewPhoto
            ];

            const updatedReview = await Review
                .findByIdAndUpdate(
                    reviewId,
                    {photos: reviewPhotos},
                    {new: true, runValidators: true}
                ).lean();

            res
                .status(errorStatuses.code_201)
                .json(updatedReview);
        } catch (e) {
            next(e);
        }
    }
};
