const authRouter = require('express').Router();

const {authController} = require('../controllers');

const {
    authMiddleware,
    validatorMiddleware
} = require('../middlewares');

const {authValidator} = require('../validators');

authRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(authValidator, 1),
    authMiddleware.checkPhoneOrEmail,
    authController.login
);

authRouter.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

module.exports = authRouter;

