const {model, Schema} = require('mongoose');

const {
    modelNames
} = require('../constants');

const guestReviewSchema = new Schema({
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
    place: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.PLACE
    },
    guest: {
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

module.exports = model(modelNames.GUEST_REVIEW, guestReviewSchema);
