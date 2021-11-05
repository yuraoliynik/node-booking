const {errorStatuses} = require('../constants');
const {
    OAuth,
    User
} = require('../models');
const {passwordService} = require('../services');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const foundUsers = await User.find().lean();

            res
                .json(foundUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {foundUser} = req;

            res
                .json(foundUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {body, body: {password}} = req;

            const hashPassword = await passwordService.hash(password);

            const createdUser = await User.create({
                ...body,
                password: hashPassword
            });

            res
                .status(errorStatuses.code_201)
                .json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {params: {userId}, body} = req;

            const updatedUser = await User
                .findByIdAndUpdate(
                    userId,
                    body,
                    {new: true, runValidators: true}
                ).lean();

            res
                .status(errorStatuses.code_201)
                .json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            await User.deleteOne({_id: userId});
            OAuth.deleteMany({user: userId});

            res
                .status(errorStatuses.code_204);
        } catch (e) {
            next(e);
        }
    }
};
