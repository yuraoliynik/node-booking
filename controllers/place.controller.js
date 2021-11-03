const {Place} = require('../models');

module.exports = {
    create: async (req, res, next) => {
        try {
            const {body} = req;

            const createdPlace = await Place.create(body);

            res.json(createdPlace);
        } catch (e) {
            next(e);
        }
    }
};
