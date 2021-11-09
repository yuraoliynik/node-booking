const authRouter = require('express').Router();

const {actionTokenTypes} = require('../constants');
const {authController} = require('../controllers');

const {
    accessMiddleware,
    authMiddleware,
    validatorMiddleware
} = require('../middlewares');

const {authValidator} = require('../validators');

authRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(authValidator.checkDataForLogin, 1),
    authMiddleware.checkPhoneOrEmail,
    authMiddleware.checkPassword,
    accessMiddleware.checkUserStatus,
    authController.login
);

authRouter.post(
    '/activate',
    validatorMiddleware.isBodyValidate(authValidator.checkEmail, 1),
    authMiddleware.checkActionToken(actionTokenTypes.ACTIVATE_USER),
    authController.activateUserByEmail
);
authRouter.put(
    '/activate',
    validatorMiddleware.isBodyValidate(authValidator.checkPhone, 1),
    authMiddleware.checkMessageToken,
    authController.activateUserByPhone
);
authRouter.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);
authRouter.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

authRouter.post(
    '/forgot-password/email',
    validatorMiddleware.isBodyValidate(authValidator.checkEmail, 1),
    authMiddleware.checkPhoneOrEmail,
    authController.forgotPasswordByEmail
);
authRouter.put(
    '/forgot-password/email',
    validatorMiddleware.isBodyValidate(authValidator.checkNewPassword),
    authMiddleware.checkActionToken(actionTokenTypes.FORGOT_PASSWORD),
    authController.changePasswordByEmail
);

module.exports = authRouter;

