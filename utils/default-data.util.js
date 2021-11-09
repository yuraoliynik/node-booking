const {
    USER_ADMIN_EMAIL,
    USER_ADMIN_PASSWORD
} = require('../configs/config');

const {
    userStatuses,
    userRoles
} = require('../constants');

const {User} = require('../models');
const {passwordService} = require('../services');

module.exports = async () => {
    const admin = await User
        .findOne({
            role: userRoles.ADMIN
        });

    const hashPassword = await passwordService.hash(USER_ADMIN_PASSWORD);

    if (!admin) {
        await User.create({
            name: 'Admin',
            last_name: 'Admin',
            email: USER_ADMIN_EMAIL,
            password: hashPassword,
            status: userStatuses.ACTIVE,
            role: userRoles.ADMIN
        });
    }
};
