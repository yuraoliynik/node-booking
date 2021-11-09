const Joi = require('joi');

const reviewProp = {
    comment:
        Joi.string()
            .max(300),
    rating:
        Joi.number()
            .min(0)
            .max(5)
            .default(0),
    guest:
        Joi.string(),
    place:
        Joi.string(),
    holder:
        Joi.string()
};

const {
    comment,
    rating,
    guest,
    place,
    holder
} = reviewProp;

module.exports = {
    createGuestReview: Joi.object({
        comment: comment
            .required(),
        rating: rating
            .required(),
        guest: guest
            .required(),
        place: place
            .required()
    }),

    createHolderReview: Joi.object({
        comment: comment
            .required(),
        rating: rating
            .required(),
        guest: guest
            .required(),
        holder: holder
            .required()
    }),

    changeDataReviewForManager: Joi.object({
        comment,
        rating,
        guest,
        place,
        holder
    })
};
