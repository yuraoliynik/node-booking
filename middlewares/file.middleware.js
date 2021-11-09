const {
    errorMessages,
    errorStatuses,
    fileMaxSizes,
    fileMimeTypes
} = require('../constants');

module.exports = {
    checkPhoto: (req, res, next) => {
        try {
            const {photo} = req.files;

            if (!photo) {
                return next({
                    message: errorMessages.NO_PHOTO,
                    status: errorStatuses.code_400
                });
            }

            const {size, mimetype} = photo;

            if (!fileMimeTypes.PHOTOS.includes(mimetype)) {
                return next({
                    message: errorMessages.NOT_SUPPORTED_FORMAT,
                    status: errorStatuses.code_400
                });
            }

            if (fileMaxSizes.PHOTO < size) {
                return next({
                    message: errorMessages.FILE_IS_TOO_BIG,
                    status: errorStatuses.code_400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
