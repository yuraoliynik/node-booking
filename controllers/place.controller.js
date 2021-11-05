const {errorStatuses} = require('../constants');
const {Place} = require('../models');

module.exports = {
    getPlaces: async (req, res, next) => {
        try {
            const foundPlaces = await Place.find().lean();

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
    }
};
