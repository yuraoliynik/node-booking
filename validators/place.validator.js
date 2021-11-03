const Joi = require('joi');

const {
    placeStatuses
} = require('../constants');

const placeValidator = Joi.object({
    title: Joi.string()
        .required()
        .max(50),

    description: Joi.string()
        .max(300),

    country: Joi.string()
        .required(),

    city: Joi.string()
        .required(),

    region: Joi.string(),

    district: Joi.string(),

    street: Joi.string()
        .required(),

    house: Joi.number()
        .required(),

    apartment: Joi.number(),

    price: Joi.number(),

    square: Joi.number(),

    guests: Joi.number(),

    bedrooms: Joi.number(),

    bathrooms: Joi.number(),

    beds: Joi.number(),

    photo: Joi.array()
        .items(Joi.string()),

    rating: Joi.number(),

    status: Joi.string()
        .allow(...Object.values(placeStatuses))
        .default(placeStatuses.CHECKING),

    owner: Joi.string()
        .required(),

    owner_confirmation: Joi.boolean()
        .required()
        .default(false)
});

module.exports = placeValidator;
