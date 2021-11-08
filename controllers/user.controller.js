const {HOST_URL} = require('../configs/config');

const {
    actionTokenTypes,
    emailActions,
    errorStatuses,
    messageTokenTypes
} = require('../constants');

const {
    ActionToken,
    OAuth,
    User
} = require('../models');

const {
    emailService,
    jwtService,
    messageService,
    messageTokenService,
    passwordService
} = require('../services');

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
            const {
                body,
                body: {password}
            } = req;

            const hashPassword = await passwordService.hash(password);

            const createdUser = await User.create({
                ...body,
                password: hashPassword
            });

            const {_id, phone_number, email} = createdUser;

            if (!!phone_number) {
                const messageToken = await messageTokenService.createMessageToken(
                    _id,
                    messageTokenTypes.ACTIVATE_USER
                );

                const messageText = `${messageToken.token} is your verification code.`;

                await messageService.sendMessage(
                    phone_number,
                    messageText
                );
            }

            if (!!email) {
                const actionToken = jwtService.generateActionToken(actionTokenTypes.ACTIVATE_USER);

                await ActionToken.create({
                    ...actionToken,
                    user: _id
                });

                const linkActivateUser = `${HOST_URL}/auth/activate/${actionToken.token}`;
                await emailService.sendMail(
                    email,
                    emailActions.USER_REGISTRATION,
                    {
                        userName: name,
                        link: linkActivateUser
                    }
                );
            }

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
