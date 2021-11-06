const {
    userRoles: {
        ADMIN,
        MANAGER,
        HOLDER,
        GUEST
    }
} = require('../constants');

module.exports = {
    [ADMIN]: [
        MANAGER,
        HOLDER,
        GUEST
    ],

    [MANAGER]: [
        HOLDER,
        GUEST
    ],

    [HOLDER]: [],

    [GUEST]: []
};
