const {model, Schema} = require('mongoose');

const {
    modelNames
} = require('../constants');

const ownerReviewSchema = new Schema({
    comment:  {
        type: Date,
        required: true
    },
    photo:  {
        type: Array[String],
        required: true,
        default: undefined
    },
    rating: {
        type: Number,
        required: true,
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
