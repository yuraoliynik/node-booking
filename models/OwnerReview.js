const {model, Schema} = require('mongoose');

const {
    modelNames
} = require('../constants');

const ownerReviewSchema = new Schema({
    comment: {
        type: String,
        length: 300,
        default: ''
    },
    photo: {
        type: [String],
        default: ''
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
        ref: modelNames.USER
    },
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = model(modelNames.OWNER_REVIEW, ownerReviewSchema);
