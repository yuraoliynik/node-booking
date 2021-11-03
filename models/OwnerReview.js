const {model, Schema} = require('mongoose');

const {
    modelNames
} = require('../constants');

const ownerReviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
        length: 300,
        default: undefined
    },
    photo: {
        type: Array[String],
        required: true,
        default: undefined
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    guest: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.USER
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.User
    },
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = model(modelNames.OWNER_REVIEW, ownerReviewSchema);
