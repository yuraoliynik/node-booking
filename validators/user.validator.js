const Joi = require('joi');

const {
    regexp,
    userRoles,
    userStatuses
} = require('../constants');

const name = Joi.string()
    .min(2)
    .max(15)
    .trim();

const last_name = Joi.string()
    .min(2)
    .max(15)
    .trim();

const phone_number = Joi.string()
    .trim()
    .regex(regexp.PHONE_NUMBER);

const email = Joi.string()
    .trim()
    .lowercase()
    .regex(regexp.EMAIL);

const password = Joi.string()
    .min(6)
    .trim()
    .regex(regexp.PASSWORD);

const avatar = Joi.string();

const rating = Joi.number()
    .min(0)
    .max(5);

const status = Joi.string()
    .valid(...Object.values(userStatuses));

const role = Joi.string();

module.exports = {
    create: Joi.object({
        name: name.required(),
        last_name: last_name.required(),
        phone_number: phone_number.required(),
        email: email.required(),
        password: password.required(),
        role: role.required().valid(userRoles.GUEST, userRoles.OWNER)
    }),

    createManager: Joi.object({
        name: name.required(),
        last_name: last_name.required(),
        phone_number: phone_number.required(),
        email: email.required(),
        password: password.required(),
        status: status.default(userStatuses.ACTIVE),
        role: role.required().valid(userRoles.MANAGER)
    }),

    updateAvatar: Joi.object({
        avatar: avatar.required()
    }),

    updateData: Joi.object({
        name,
        last_name,
        rating,
        status
    })
};
