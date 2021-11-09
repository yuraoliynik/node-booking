const {
    endPoints: {
        GET_USERS,
        GET_USER_BY_ID,

        CREATE_USER,
        UPDATE_USER,
        DELETE_USER,

        ADD_AVATAR,
        UPDATE_AVATAR,
        ADD_PHONE_OR_EMAIL,
        USER_STATUS_DEACTIVATED,
        USER_GET_PLACES,
        USER_GET_ORDERS,

        CHANGE_USER_DATA,
        CHANGE_USER_STATUS,

        GET_PLACES,
        GET_PLACE_BY_ID,

        CREATE_PLACE,
        UPDATE_PLACE,
        DELETE_PLACE,

        ADD_PLACE_PHOTO,

        CHANGE_PLACE_DATA,
        
        GET_ORDERS,
        GET_ORDER_BY_ID,
        
        CREATE_ORDER,
        DELETE_ORDER,

        HOLDER_CONFIRM_ORDER,

        CHANGE_ORDER_DATA,

        GET_REVIEWS,
        GET_REVIEW_BY_ID,

        CREATE_GUEST_REVIEW,
        CREATE_HOLDER_REVIEW,
        DELETE_REVIEW,

        ADD_REVIEW_PHOTO,

        CHANGE_REVIEW_DATA
    },
    userRoles: {
        ADMIN,
        ALL, //open endpoint
        GUEST,
        HOLDER,
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

    [ADD_PHONE_OR_EMAIL]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [USER_STATUS_DEACTIVATED]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [USER_GET_PLACES]: [OWNER],

    [USER_GET_ORDERS]: [OWNER],

    [CHANGE_USER_DATA]: [
        ADMIN,
        MANAGER
    ],

    [CHANGE_USER_STATUS]: [
        ADMIN,
        MANAGER
    ],

    [GET_PLACES]: [ALL],

    [GET_PLACE_BY_ID]: [ALL],

    [CREATE_PLACE]: [
        ADMIN,
        MANAGER,
        HOLDER
    ],

    [UPDATE_PLACE]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [DELETE_PLACE]: [
        ADMIN,
        MANAGER
    ],

    [ADD_PLACE_PHOTO]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [CHANGE_PLACE_DATA]: [
        ADMIN,
        MANAGER
    ],
    
    [GET_ORDERS]: [
        ADMIN,
        MANAGER
    ],

    [GET_ORDER_BY_ID]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [CREATE_ORDER]: [GUEST],

    [DELETE_ORDER]: [
        ADMIN,
        MANAGER
    ],

    [HOLDER_CONFIRM_ORDER]: [HOLDER],

    [CHANGE_ORDER_DATA]: [
        ADMIN,
        MANAGER
    ],

    [GET_REVIEWS]: [ALL],

    [GET_REVIEW_BY_ID]: [ALL],

    [CREATE_GUEST_REVIEW]: [GUEST],

    [CREATE_HOLDER_REVIEW]: [HOLDER],

    [DELETE_REVIEW]: [
        ADMIN,
        MANAGER
    ],

    [ADD_REVIEW_PHOTO]: [
        ADMIN,
        MANAGER,
        OWNER
    ],

    [CHANGE_REVIEW_DATA]: [
        ADMIN,
        MANAGER
    ]
};
