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
    photos:
        Joi.array()
            .items(Joi.string()),
    rating:
        Joi.number(),
    status:
        Joi.string(),
    holder:
        Joi.string(),
    holder_confirmation:
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
    photos,
    status,
    holder,
    holder_confirmation,
} = placeJoiProp;

module.exports = {
    createPlace: Joi.object({
        title: title
            .required(),
        description: description
            .required(),
        country: country
            .required(),
        city: city
            .required(),
        region,
        district,
        street: street
            .required(),
        house: house
            .required(),
        apartment,
        price,
        square,
        guests,
        bedrooms,
        bathrooms,
        beds,
        holder: holder
            .required(),
        holder_confirmation: holder_confirmation
            .required(),
    }),

    updateData: Joi.object({
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
        photos,
        status: status
            .valid(
                placeStatuses.ENABLE,
                placeStatuses.DISABLED
            ),
        holder_confirmation
    }),

    changePlaceDataForManager: Joi.object({
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
        photos,
        status: status
            .valid(...Object.values(placeStatuses)),
        holder,
        holder_confirmation,
    }),
};
