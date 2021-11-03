const Joi = require('joi');

const {
    regexp,
    userRoles,
    userStatuses
} = require('../constants');

const userValidator = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(15)
        .trim(),

    last_name: Joi.string()
        .required()
        .min(2)
        .max(15)
        .trim(),

    phone_number: Joi.string()
        .required()
        .trim()
        .regex(regexp.PHONE_NUMBER),

    email: Joi.string()
        .required()
        .trim()
        .lowercase()
        .regex(regexp.EMAIL),

    password: Joi.string()
        .required()
        .min(6)
        .trim()
        .regex(regexp.PASSWORD),

    avatar: Joi.string(),

    rating: Joi.number(),

    status: Joi.string()
        .allow(...Object.values(userStatuses))
        .default(userStatuses.NOT_ACTIVE),

    role: Joi.string()
        .allow(...Object.values(userRoles))
        .default(userRoles.GUEST)
});

module.exports = userValidator;
