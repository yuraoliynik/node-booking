const {model, Schema} = require('mongoose');

const {
    modelNames,
    placeStatuses
} = require('../constants');

const placeSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    region: {
        type: String,
        default: ''
    },
    district: {
        type: String,
        default: ''
    },
    street: {
        type: String,
        required: true
    },
    house: {
        type: Number,
        required: true
    },
    apartment: {
        type: Number,
        required: true,
        default: -1
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    square: {
        type: Number,
        required: true,
        default: 0
    },
    guests: {
        type: Number,
        required: true,
        default: 1
    },
    bedrooms: {
        type: Number,
        required: true,
        default: 0
    },
    bathrooms: {
        type: Number,
        required: true,
        default: 0
    },
    beds: {
        type: Number,
        required: true,
        default: 1
    },
    photos: {
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
    status: {
        type: String,
        required: true,
        enum: Object.values(placeStatuses),
        default: placeStatuses.CHECKING
    },
    holder: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.USER
    },
    holder_confirmation: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = model(modelNames.PLACE, placeSchema);
