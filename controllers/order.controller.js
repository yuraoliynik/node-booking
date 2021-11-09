const {errorStatuses} = require('../constants');
const {Order} = require('../models');

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            const foundOrders = await Order
                .find()
                .lean();

            res
                .json(foundOrders);
        } catch (e) {
            next(e);
        }
    },

    getOrderById: (req, res, next) => {
        try {
            const {foundOrder} = req;

            res
                .json(foundOrder);
        } catch (e) {
            next(e);
        }
    },

    createOrder: async (req, res, next) => {
        try {
            const {body} = req;

            const createdOrder = await Order.create(body);

            res
                .status(errorStatuses.code_201)
                .json(createdOrder);
        } catch (e) {
            next(e);
        }
    },

    updateOrder: async (req, res, next) => {
        try {
            const {params: {orderId}, body} = req;

            const updatedOrder = await Order
                .findByIdAndUpdate(
                    orderId,
                    body,
                    {new: true, runValidators: true}
                ).lean();

            res
                .status(errorStatuses.code_201)
                .json(updatedOrder);
        } catch (e) {
            next(e);
        }
    },

    deleteOrder: async (req, res, next) => {
        try {
            const {params: {orderId}} = req;

            await Order.deleteOne({_id: orderId});

            res
                .status(errorStatuses.code_204);
        } catch (e) {
            next(e);
        }
    }
};
