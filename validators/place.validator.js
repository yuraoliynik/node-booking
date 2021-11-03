const Joi = require('joi');

const {
    placeStatuses
} = require('../constants');

const title = Joi.string()
    .max(50);

const description = Joi.string()
    .max(300);

const country = Joi.string();

const city = Joi.string();

const region = Joi.string();

const district = Joi.string();

const street = Joi.string();

const house = Joi.number();

const apartment = Joi.number();

const price = Joi.number();

const square = Joi.number();

const guests = Joi.number();

const bedrooms = Joi.number();

const bathrooms = Joi.number();

const beds = Joi.number();

const photo = Joi.array()
    .items(Joi.string());

const rating = Joi.number();

const status = Joi.string()
    .valid(...Object.values(placeStatuses));

const owner = Joi.string();

const owner_confirmation = Joi.boolean();

module.exports = {
    create: Joi.object({
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
    }),
};
