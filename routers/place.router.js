const placeRouter = require('express').Router();


const {
    userRoles
} = require('../constants');

const {
    placeController
} = require('../controllers');

const {
    authMiddleware,
    placeMiddleware,
    roleMiddleware,
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
    roleMiddleware.checkUserRole([
        userRoles.ADMIN,
        userRoles.MANAGER,
        userRoles.OWNER
    ]),
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
    roleMiddleware.ifUserRole([
        userRoles.ADMIN,
        userRoles.MANAGER,
        userRoles.OWNER
    ]),
    placeMiddleware.isPlaceIdExist,
    roleMiddleware.forUserRoleCheckUserId(userRoles.OWNER),
    placeController.getPlaceById
);

module.exports = placeRouter;
