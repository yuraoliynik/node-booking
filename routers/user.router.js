const userRouter = require('express').Router();

const {endPoints} = require('../constants');
const {userController} = require('../controllers');

const {
    accessMiddleware,
    authMiddleware,
    fileMiddleware,
    userMiddleware,
    validatorMiddleware
} = require('../middlewares');

const {userValidator} = require('../validators');

userRouter.get(
    '/',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.GET_USERS),
    userController.getUsers
);
userRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(userValidator.createUser),
    accessMiddleware.checkEndpointPermissions(endPoints.CREATE_USER),
    userMiddleware.isPhoneOrEmailExist,
    userController.createUser
);

userRouter.get(
    '/:userId',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.GET_USER_BY_ID),
    userMiddleware.checkUserIdAndFoundUser,
    userController.getUserById
);
userRouter.put(
    '/:userId',
    validatorMiddleware.isBodyValidate(userValidator.updateData),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.UPDATE_USER),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userController.updateUser
);
userRouter.delete(
    '/:userId',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.DELETE_USER),
    userMiddleware.checkUserIdAndFoundUser,
    userController.deleteUser
);

userRouter.post(
    '/:userId/avatar',
    fileMiddleware.checkPhoto,
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.ADD_AVATAR),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userMiddleware.uploadUserAvatar,
    userController.updateUser
);
userRouter.post(
    '/:userId/phone-or-email',
    validatorMiddleware.isBodyValidate(userValidator.updatePhoneOrEmail),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.ADD_PHONE_OR_EMAIL),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userMiddleware.addPhoneOrEmail,
    userMiddleware.isPhoneOrEmailExist,
    userController.updateUser
);
userRouter.post(
    '/:userId/status',
    validatorMiddleware.isBodyValidate(userValidator.userStatusDeactivated),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.USER_STATUS_DEACTIVATED),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userController.changeUserStatus
);
userRouter.get(
    '/:userId/places',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.USER_GET_PLACES),
    userController.userGetPlaces
);
userRouter.get(
    '/:userId/orders',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.USER_GET_ORDERS),
    userController.userGetOrders
);
userRouter.post(
    '/:userId/data',
    validatorMiddleware.isBodyValidate(userValidator.changeUserDataForManager),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.CHANGE_USER_DATA),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userController.updateUser
);
userRouter.put(
    '/:userId/status',
    validatorMiddleware.isBodyValidate(userValidator.changeStatusForManager),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.CHANGE_USER_STATUS),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userController.changeUserStatus
);

module.exports = userRouter;
