const {User} = require('../models');

module.exports = {
    create: async (req, res, next) => {
        try {
            const {body} = req;

            const createdUser = await User.create(body);

            res.json(createdUser);
        } catch (e) {
            next(e);
        }
    }
};
