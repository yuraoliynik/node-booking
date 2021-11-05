const Joi = require('joi');

const {userJoiProp} = require('./user.validator');

const {
    phone_number,
    email,
    password
} = userJoiProp;

const authValidator = Joi.object({
    phone_number,
    email,
    password: password.required()
}).xor('phone_number', 'email');

module.exports = authValidator;
