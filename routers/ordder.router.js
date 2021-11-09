const orderRouter = require('express').Router();

const {endPoints} = require('../constants');
const {orderController} = require('../controllers');

const {
    accessMiddleware,
    authMiddleware,
    orderMiddleware,
    validatorMiddleware
} = require('../middlewares');

const {orderValidator} = require('../validators');

orderRouter.get(
    '/',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkOrderEndpointPermissions(endPoints.GET_ORDERS),
    orderController.getOrders
);
orderRouter.post(
    '/',
    validatorMiddleware.isBodyValidate(orderValidator.createOrder),
    authMiddleware.checkAccessToken,
    accessMiddleware.checkOrderEndpointPermissions(endPoints.CREATE_ORDER),
    orderMiddleware.checkHolderConfirmation,
    orderController.createOrder
);

orderRouter.post(
    '/:orderId',
    authMiddleware.checkAccessToken,
    orderMiddleware.checkOrderIdAndFoundOrder,
    accessMiddleware.checkOrderEndpointPermissions(endPoints.GET_PLACE_BY_ID),
    orderController.getOrderById
);
orderRouter.delete(
    '/:orderId',
    authMiddleware.checkAccessToken,
    orderMiddleware.checkOrderIdAndFoundOrder,
    accessMiddleware.checkOrderEndpointPermissions(endPoints.DELETE_ORDER),
    orderController.deleteOrder
);
orderRouter.post(
    '/:orderId/data',
    validatorMiddleware.isBodyValidate(orderValidator.changeOrderDataForManager),
    authMiddleware.checkAccessToken,
    orderMiddleware.checkOrderIdAndFoundOrder,
    accessMiddleware.checkOrderEndpointPermissions(endPoints.CHANGE_ORDER_DATA),
    orderController.updateOrder
);
orderRouter.post(
    '/:orderId/status',
    validatorMiddleware.isBodyValidate(orderValidator.holderConfirmOrder),
    authMiddleware.checkAccessToken,
    orderMiddleware.checkOrderIdAndFoundOrder,
    accessMiddleware.checkOrderEndpointPermissions(endPoints.HOLDER_CONFIRM_ORDER),
    orderController.updateOrder
);

module.exports = orderRouter;
