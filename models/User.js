const {model, Schema} = require('mongoose');

const {
    modelNames,
    userRoles,
    userStatuses
} = require('../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
        trim: true
    },
    phone_number: {
        type: Number,
        minlength: 12,
        maxlength: 12,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    avatar: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        required: true,
        default: undefined
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(userStatuses),
        default: userStatuses.NOT_ACTIVE
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(userRoles),
        default: userRoles.GUEST
    }
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = model(modelNames.USER, userSchema);
