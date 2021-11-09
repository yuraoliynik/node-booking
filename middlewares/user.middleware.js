const {
    errorMessages,
    errorStatuses,
    itemTypes
} = require('../constants');

const {User} = require('../models');
const {s3Service} = require('../services');

module.exports = {
    addPhoneOrEmail: (req, res, next) => {
        try {
            const {
                foundUser: {phone_number, email},
                body
            } = req;

            const checkToAddPhone = (!phone_number.length && !!body.phone_number);
            const checkToAddEmail = (!email.length && !!body.email);

            if (checkToAddPhone) {
                return next();
            }

            if (checkToAddEmail) {
                return next();
            }

            next({
                message: errorMessages.CAN_NOT_CHANGE_PHONE_OR_EMAIL,
                status: errorStatuses.code_409
            });
        } catch (e) {
            next(e);
        }
    },

    checkUserIdAndFoundUser: async (req, res, next) => {
        try {
            const {
                params: {userId},
                checkedOwner
            } = req;

            if (checkedOwner) {
                return next();
            }

            const foundUser = await User
                .findById(userId)
                .lean();

            if (!foundUser) {
                return next({
                    message: errorMessages.USER_ID_DOESNT_EXIST,
                    status: errorStatuses.code_404
                });
            }

            req.foundUser = foundUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    isPhoneOrEmailExist: async (req, res, next) => {
        try {
            const {body: {phone_number, email}} = req;

            let foundUser;

            if (phone_number) {
                foundUser = await User
                    .findOne({phone_number})
                    .lean();
            }

            if (email) {
                foundUser = await User
                    .findOne({email})
                    .lean();
            }

            if (foundUser) {
                return next({
                    message: errorMessages.USER_PHONE_OR_EMAIL_ALREADY_EXISTS,
                    status: errorStatuses.code_409
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    uploadUserAvatar: async (req, res, next) => {
        try {
            const {
                files: {photo},
                foundUser: {_id}
            } = req;

            const uploadInfo = await s3Service.uploadImage(
                photo,
                itemTypes.USERS,
                _id.toString()
            );

            req.body = {avatar: uploadInfo.Location};

            next();
        } catch (err) {
            next(err);
        }
    }
};
