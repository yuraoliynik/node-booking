const Joi = require('joi');

const {
    regexp,
    userRoles,
    userStatuses
} = require('../constants');

const userJoiProp = {
    name:
        Joi.string()
            .min(2)
            .max(15)
            .trim(),
    last_name:
        Joi.string()
            .min(2)
            .max(15)
            .trim(),
    phone_number:
        Joi.string()
            .trim()
            .regex(regexp.PHONE_NUMBER),
    email:
        Joi.string()
            .trim()
            .lowercase()
            .regex(regexp.EMAIL),
    password:
        Joi.string()
            .min(6)
            .trim()
            .regex(regexp.PASSWORD),
    avatar:
        Joi.string(),
    rating:
        Joi.number()
            .min(0)
            .max(5),
    status:
        Joi.string()
            .valid(...Object.values(userStatuses)),
    role:
        Joi.string()
};

const {
    name,
    last_name,
    phone_number,
    email,
    password,
    avatar,
    rating,
    status,
    role
} = userJoiProp;

module.exports = {
    updatePhoneOrEmail: Joi.object({
        phone_number,
        email
    }).xor('phone_number', 'email'),

    createUser: Joi.object({
        name: name
            .required(),
        last_name: last_name
            .required(),
        phone_number,
        email,
        password: password
            .required(),
        role: role
            .required()
            .valid(
                userRoles.GUEST,
                userRoles.HOLDER
            )
    }).xor('phone_number', 'email'),

    updateAvatar: Joi.object({
        avatar: avatar
            .required()
    }),

    updateData: Joi.object({
        name,
        last_name
    }),

    changeUserDataForManager: Joi.object({
        name,
        last_name,
        phone_number,
        email,
        password,
        avatar,
        rating,
        status,
        role
    }),

    userJoiProp
};
