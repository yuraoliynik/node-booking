const userRouter = require('express').Router();

const {
    userController
} = require('../controllers');
const {
    userMiddleware,
    validatorMiddleware
} = require('../middlewares');
const {
    userValidator
} = require('../validators');

userRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(userValidator.create),
    userMiddleware.isPhoneOrEmailExist,
    userController.create
);

module.exports = userRouter;
