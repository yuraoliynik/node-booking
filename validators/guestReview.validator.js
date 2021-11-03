const Joi = require('joi');

const guestReviewValidator = Joi.object({
    comment: Joi.string()
        .max(300),

    photo: Joi.array()
        .items(Joi.string()),

    rating: Joi.number()
        .required()
        .min(0)
        .max(5)
        .default(0),

    place: Joi.string()
        .required(),

    guest: Joi.string()
        .required(),
});

module.exports = guestReviewValidator;
