const placeRouter = require('express').Router();

const {
    placeController
} = require('../controllers');
const {
    validatorMiddleware
} = require('../middlewares');
const {
    placeValidator
} = require('../validators');

placeRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(placeValidator.create),
    placeController.create
);

module.exports = placeRouter;
