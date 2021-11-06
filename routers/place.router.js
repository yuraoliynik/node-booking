const placeRouter = require('express').Router();

const {
    placeController
} = require('../controllers');

const {
    authMiddleware,
    placeMiddleware,
    validatorMiddleware
} = require('../middlewares');

const {
    placeValidator
} = require('../validators');


placeRouter.get(
    '/',
    placeController.getPlaces
);
placeRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(placeValidator.createPlace),
    authMiddleware.checkAccessToken,

    placeController.createPlace
);

placeRouter.get(
    '/:placeId',
    placeMiddleware.isPlaceIdExist,
    placeController.getPlaceById
);
placeRouter.put(
    '/:placeId',
    validatorMiddleware.isBodyValidate(placeValidator.updateData),
    authMiddleware.checkAccessToken,

    placeMiddleware.isPlaceIdExist,
    placeController.getPlaceById
);

module.exports = placeRouter;
