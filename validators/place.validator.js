const Joi = require('joi');

const {
    placeStatuses
} = require('../constants');

const placeJoiProp = {
    title:
        Joi.string()
            .max(50),
    description:
        Joi.string()
            .max(300),
    country:
        Joi.string(),
    city:
        Joi.string(),
    region:
        Joi.string(),
    district:
        Joi.string(),
    street:
        Joi.string(),
    house:
        Joi.number(),
    apartment:
        Joi.number(),
    price:
        Joi.number(),
    square:
        Joi.number(),
    guests:
        Joi.number(),
    bedrooms:
        Joi.number(),
    bathrooms:
        Joi.number(),
    beds:
        Joi.number(),
    photo:
        Joi.array()
            .items(Joi.string()),
    rating:
        Joi.number(),
    status:
        Joi.string()
            .valid(...Object.values(placeStatuses)),
    owner:
        Joi.string(),
    owner_confirmation:
        Joi.boolean()
};

const {
    title,
    description,
    country,
    city,
    region,
    district,
    street,
    house,
    apartment,
    price,
    square,
    guests,
    bedrooms,
    bathrooms,
    beds,
    photo,
    rating,
    status,
    owner,
    owner_confirmation,
} = placeJoiProp;

module.exports = {
    createPlace: Joi.object({
        title: title.required(),
        description: description.required(),
        country: country.required(),
        city: city.required(),
        region,
        district,
        street: street.required(),
        house: house.required(),
        apartment,
        price,
        square,
        guests,
        bedrooms,
        bathrooms,
        beds,
        owner: owner.required(),
        owner_confirmation,
    }),

    updatePhoto: Joi.object({
        photo: photo.required()
    }),

    updateData: Joi.object({
        title,
        description,
        region,
        district,
        price,
        square,
        guests,
        bedrooms,
        bathrooms,
        beds,
        rating,
        status,
        owner_confirmation
    })
};
