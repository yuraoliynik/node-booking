const {
    errorStatuses,
    placeStatuses
} = require('../constants');

const {Place} = require('../models');

module.exports = {
    getPlaces: async (req, res, next) => {
        try {
            const foundPlaces = await Place
                .find({
                    status: placeStatuses.ENABLE
                })
                .lean();

            res
                .json(foundPlaces);
        } catch (e) {
            next(e);
        }
    },

    getPlaceById: (req, res, next) => {
        try {
            const {foundPlace} = req;

            res
                .json(foundPlace);
        } catch (e) {
            next(e);
        }
    },

    createPlace: async (req, res, next) => {
        try {
            const {body} = req;

            const createdPlace = await Place.create(body);

            res
                .status(errorStatuses.code_201)
                .json(createdPlace);
        } catch (e) {
            next(e);
        }
    },

    updatePlace: async (req, res, next) => {
        try {
            const {params: {placeId}, body} = req;

            const updatedPlace = await Place
                .findByIdAndUpdate(
                    placeId,
                    body,
                    {new: true, runValidators: true}
                ).lean();

            res
                .status(errorStatuses.code_201)
                .json(updatedPlace);
        } catch (e) {
            next(e);
        }
    },

    deletePlace: async (req, res, next) => {
        try {
            const {params: {placeId}} = req;

            await Place.deleteOne({_id: placeId});

            res
                .status(errorStatuses.code_204);
        } catch (e) {
            next(e);
        }
    },

    addPlacePhoto: async (req, res, next) => {
        try {
            const {
                params: {placeId},
                body: {newPlacePhoto},
                foundPlace: {photos}
            } = req;

            const placePhotos = [
                ...photos,
                newPlacePhoto
            ];

            const updatedPlace = await Place
                .findByIdAndUpdate(
                    placeId,
                    {photos: placePhotos},
                    {new: true, runValidators: true}
                ).lean();

            res
                .status(errorStatuses.code_201)
                .json(updatedPlace);
        } catch (e) {
            next(e);
        }
    }
};
