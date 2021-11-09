const {
    emailActions,
    errorMessages,
    errorStatuses,
    orderStatuses
} = require('../constants');

const {
    Order,
    Place,
    User
} = require('../models');

const {emailService} = require('../services');

module.exports = {
    checkOrderIdAndFoundOrder: async (req, res, next) => {
        try {
            const {params: {orderId}} = req;

            const foundOrder = await Order
                .findById(orderId)
                .lean();

            if (!foundOrder) {
                return next({
                    message: errorMessages.ORDER_ID_DOESNT_EXIST,
                    status: errorStatuses.code_404
                });
            }

            req.foundOrder = foundOrder;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkHolderConfirmation: async (req, res, next) => {
        try {
            const {
                body,
                body: {
                    count_days,
                    count_persons,
                    place,
                    guest
                }
            } = req;

            const foundPlace = await Place
                .findById(place)
                .populate({path: 'holder', lean: true})
                .lean();

            if (!foundPlace) {
                return next({
                    message: errorMessages.PLACE_ID_DOESNT_EXIST,
                    status: errorStatuses.code_404
                });
            }

            const foundGuest = await User
                .findById(guest)
                .lean();

            if (!foundGuest) {
                return next({
                    message: errorMessages.USER_ID_DOESNT_EXIST,
                    status: errorStatuses.code_404
                });
            }

            const {holder_confirmation} = foundPlace;

            if (!holder_confirmation) {
                body.status = orderStatuses.ALLOW;

                next();
            }

            body.status = orderStatuses.AWAITING_CONFIRMATION;

            const {
                city,
                street,
                house,
                apartment,
                holder
            } = foundPlace;

            const apartmentNumber = apartment > -1 ? apartment : '';

            const placeAddress = `${city}, ${street}, ${house}, ${apartment}, ${apartmentNumber}`;
            const guestName = foundGuest.name;
            const countDays = count_days;
            const countPersons = count_persons;

            await emailService.sendMail(
                holder.email,
                emailActions.ORDER_AWAITS_CONFIRMATION,
                {
                    userName: holder.name,
                    placeAddress,
                    guestName,
                    countDays,
                    countPersons
                }
            );

            next();
        } catch (e) {
            next(e);
        }
    }
};
