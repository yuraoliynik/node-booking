const {model, Schema} = require('mongoose');

const {
    modelNames
} = require('../constants');

const reviewSchema = new Schema({
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
        ref: modelNames.USER
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: modelNames.PLACE
    },
    holder: {
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    }
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = model(modelNames.REVIEW, reviewSchema);
