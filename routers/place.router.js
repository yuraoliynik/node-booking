const placeRouter = require('express').Router();

const {endPoints} = require('../constants');

const {
    placeController
} = require('../controllers');

const {
    accessMiddleware,
    authMiddleware,
    fileMiddleware,
    placeMiddleware,
    validatorMiddleware
} = require('../middlewares');

const {
    placeValidator
} = require('../validators');

placeRouter.get(
    '/',
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.GET_PLACES),
    placeController.getPlaces
);
placeRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(placeValidator.createPlace),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.CREATE_PLACE),
    placeController.createPlace
);

placeRouter.post(
    '/:placeId',
    placeMiddleware.checkPlaceIdAndFoundPlace,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.GET_PLACE_BY_ID),
    placeController.getPlaceById
);
placeRouter.put(
    '/:placeId',
    validatorMiddleware.isBodyValidate(placeValidator.updateData),
    authMiddleware.checkAccessToken,
    placeMiddleware.checkPlaceIdAndFoundPlace,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.UPDATE_PLACE),
    placeController.updatePlace
);
placeRouter.delete(
    '/:placeId',
    authMiddleware.checkAccessToken,
    placeMiddleware.checkPlaceIdAndFoundPlace,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.DELETE_PLACE),
    placeController.deletePlace
);
placeRouter.post(
    '/:placeId/photo',
    fileMiddleware.checkPhoto,
    authMiddleware.checkAccessToken,
    placeMiddleware.checkPlaceIdAndFoundPlace,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.ADD_PLACE_PHOTO),
    placeMiddleware.uploadPlacePhoto,
    placeController.addPlacePhoto
);
placeRouter.post(
    '/:placeId/data',
    validatorMiddleware.isBodyValidate(placeValidator.changePlaceDataForManager),
    authMiddleware.checkAccessToken,
    placeMiddleware.checkPlaceIdAndFoundPlace,
    accessMiddleware.checkPlaceEndpointPermissions(endPoints.CHANGE_PLACE_DATA),
    placeController.updatePlace
);

module.exports = placeRouter;
