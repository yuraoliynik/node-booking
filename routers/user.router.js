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
    fileMiddleware.checkUserAvatar,
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.ADD_AVATAR),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userMiddleware.uploadUserAvatar,
    userController.updateUser
);
userRouter.post(
    '/:userId/avatar',
    fileMiddleware.checkUserAvatar,
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.UPDATE_AVATAR),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userMiddleware.uploadUserAvatar,
    userController.updateUser
);
userRouter.delete(
    '/:userId/avatar',
    validatorMiddleware.isBodyValidate(userValidator.updateAvatar),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.DELETE_AVATAR),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
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
userRouter.delete(
    '/:userId/data',
    validatorMiddleware.isBodyValidate(userValidator.changeUserDataForManager),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkEndpointPermissions(endPoints.CHANGE_USER_DATA),
    userMiddleware.checkUserIdAndFoundUser,
    accessMiddleware.checkRoleRights,
    userController.updateUser
);

module.exports = userRouter;
