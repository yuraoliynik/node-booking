const Joi = require('joi');

const {
    orderStatuses
} = require('../constants');

const orderValidator = Joi.object({
    start_date: Joi.date()
        .required(),

    end_date: Joi.date()
        .required(),

    place: Joi.string()
        .required(),

    owner: Joi.string()
        .required(),

    guest: Joi.string()
        .required(),

    status: Joi.string()
        .valid(...Object.values(orderStatuses))
        .default(orderStatuses.CHECKING)
});

module.exports = orderValidator;
