const Joi = require('joi');

const {userJoiProp} = require('./user.validator');

const {
    phone_number,
    email,
    password
} = userJoiProp;

module.exports = {
    checkDataForLogin: Joi.object({
        phone_number,
        email,
        password: password
            .required()
    }).xor('phone_number', 'email'),

    checkEmail: Joi.object({
        email: email
            .required()
    }),

    checkPhone: Joi.object({
        phone_number: phone_number
            .required()
    }),

    checkNewPassword: Joi.object({
        new_password: password
            .required()
    })
};
