const Joi = require('joi');

const guestReviewProp = {
    comment:
        Joi.string()
            .max(300),
    photo:
        Joi.array()
            .items(Joi.string()),
    rating:
        Joi.number()
            .min(0)
            .max(5)
            .default(0),
    guest:
        Joi.string(),
    place:
        Joi.string(),
    holder:
        Joi.string()
};

const {
    comment,
    photo,
    rating,
    guest,
    place,
    holder
} = guestReviewProp;

module.exports = {
    createGuestReview: Joi.object({
        comment: comment
            .required(),
        photo,
        rating: rating
            .required(),
        guest: guest
            .required(),
        place: place
            .required()
    }),

    createHolderReview: Joi.object({
        comment: comment
            .required(),
        photo,
        rating: rating
            .required(),
        guest: guest
            .required(),
        holder: place
            .required()
    }),

    changeDataReviewForManager: Joi.object({
        comment,
        photo,
        guest,
        place,
        holder
    })
};
