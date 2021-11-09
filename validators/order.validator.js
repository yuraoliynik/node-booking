const Joi = require('joi');

const {
    orderStatuses
} = require('../constants');

const orderJoiProp = {
    start_date:
        Joi.date(),
    count_days:
        Joi.number(),
    sum:
        Joi.number(),
    count_persons:
        Joi.number(),
    place:
        Joi.string(),
    holder:
        Joi.string(),
    guest:
        Joi.string(),
    status:
        Joi.string()
};

const {
    start_date,
    count_days,
    sum,
    count_persons,
    place,
    holder,
    guest,
    status,
} = orderJoiProp;

module.exports = {
    createOrder: Joi.object({
        start_date: start_date
            .required(),
        count_days: count_days
            .required(),
        sum: sum
            .required(),
        count_persons: count_persons
            .required(),
        place: place
            .required(),
        holder: holder
            .required(),
        guest: guest
            .required()
    }),

    holderConfirmOrder: Joi.object({
        status: status
            .required()
            .valid(
                orderStatuses.ALLOW,
                orderStatuses.DENIED
            )
    }),

    changeOrderDataForManager: Joi.object({
        start_date,
        count_days,
        sum,
        count_persons,
        place,
        holder,
        guest,
        status: status
            .valid(...Object.values(orderStatuses))
    }),
};
