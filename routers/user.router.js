const userRouter = require('express').Router();

const {
    userRoles
} = require('../constants');

const {
    userController
} = require('../controllers');

const {
    authMiddleware,
    rightMiddleware,
    userMiddleware,
    validatorMiddleware
} = require('../middlewares');

const {
    userValidator
} = require('../validators');

userRouter.get(
    '/',
    authMiddleware.checkAccessToken,
    rightMiddleware.ifUserRole([
        userRoles.ADMIN,
        userRoles.MANAGER
    ]),
    userController.getUsers
);
userRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(userValidator.createUser),
    userMiddleware.isPhoneOrEmailExist,
    userController.createUser
);

userRouter.get(
    '/:userId',
    userMiddleware.isUserIdExist,
    userController.getUserById
);
userRouter.put(
    '/:userId',
    validatorMiddleware.isBodyValidate(userValidator.updateData),
    authMiddleware.checkAccessToken,
    rightMiddleware.ifUserRole([
        userRoles.ADMIN,
        userRoles.MANAGER
    ]),
    rightMiddleware.ifOwnUserId,
    userMiddleware.isUserIdExist,
    userController.updateUser
);
userRouter.delete(
    '/:userId',
    authMiddleware.checkAccessToken,
    rightMiddleware.ifUserRole([
        userRoles.ADMIN,
        userRoles.MANAGER
    ]),
    userMiddleware.isUserIdExist,
    userController.deleteUser
);

userRouter.post(
    '/:userId/phone-or-email',
    validatorMiddleware.isBodyValidate(userValidator.addPhoneOrEmail),
    authMiddleware.checkAccessToken,
    rightMiddleware.ifOwnUserId,
    userMiddleware.addPhoneOrEmail,
    userMiddleware.isPhoneOrEmailExist,
    userController.updateUser
);

module.exports = userRouter;
