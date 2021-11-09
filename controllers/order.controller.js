const {
    errorStatuses,
    placeStatuses
} = require('../constants');

const {
    Order,
    Place
} = require('../models');

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
            const {body, body: {place}} = req;

            const createdOrder = await Order.create(body);

            await Place.updateOne(
                {_id: place},
                {status: placeStatuses.RESERVED}
            );

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
                .sendStatus(errorStatuses.code_204);
        } catch (e) {
            next(e);
        }
    }
};
