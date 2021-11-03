const Joi = require('joi');

const ownerReviewValidator = Joi.object({
    comment: Joi.string()
        .max(300),

    photo: Joi.array()
        .items(Joi.string()),

    rating: Joi.number()
        .required()
        .min(0)
        .max(5)
        .default(0),

    guest: Joi.string()
        .required(),

    owner: Joi.string()
        .required(),
});

module.exports = ownerReviewValidator;
