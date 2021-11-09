const {
    errorMessages,
    errorStatuses,
    itemTypes
} = require('../constants');

const {Place} = require('../models');
const {s3Service} = require('../services');

module.exports = {
    checkPlaceIdAndFoundPlace: async (req, res, next) => {
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
    },

    uploadPlacePhoto: async (req, res, next) => {
        try {
            const {
                files: {photo},
                foundUser: {_id}
            } = req;

            const uploadInfo = await s3Service.uploadImage(
                photo,
                itemTypes.PLACES,
                _id.toString()
            );

            req.body = {newPlacePhoto: uploadInfo.Location};

            next();
        } catch (err) {
            next(err);
        }
    }
};
