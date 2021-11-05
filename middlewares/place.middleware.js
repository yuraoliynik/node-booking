const {
    errorMessages,
    errorStatuses
} = require('../constants');

const {Place} = require('../models');

module.exports = {
    isPlaceIdExist: async (req, res, next) => {
        try {
            const {params: {placeId}} = req;

            const foundPlace = await Place
                .findById(placeId)
                .lean();

            if (!foundPlace) {
                return next({
                    message: errorMessages.PLACE_ID_DOESNT_EXIST,
                    status: errorStatuses.code_404
                });
            }

            req.foundPlace = foundPlace;

            next();
        } catch (e) {
            next(e);
        }
    }
};
