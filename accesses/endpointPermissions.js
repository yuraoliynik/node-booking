const {
    endPoints: {
        GET_USERS,
        GET_USER_BY_ID,

        CREATE_USER,
        UPDATE_USER,
        DELETE_USER,

        ADD_AVATAR,
        UPDATE_AVATAR,
        DELETE_AVATAR,

        ADD_PHONE_OR_EMAIL,

        CHANGE_USER_DATA
    },
    userRoles: {
        ADMIN,
        ALL, //open endpoint
        MANAGER,
        OWNER //who created the record
    }
} = require('../constants');

module.exports = {
    [GET_USERS]: [
        ADMIN,
        MANAGER
    ],

    [GET_USER_BY_ID]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [CREATE_USER]: [ALL],

    [UPDATE_USER]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [DELETE_USER]: [
        ADMIN,
        MANAGER
    ],

    [ADD_AVATAR]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [UPDATE_AVATAR]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [DELETE_AVATAR]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [ADD_PHONE_OR_EMAIL]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [CHANGE_USER_DATA]: [
        ADMIN,
        MANAGER
    ]
};
