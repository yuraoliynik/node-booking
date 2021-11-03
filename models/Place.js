const {model, Schema} = require('mongoose');

const {
    modelNames,
    placeStatuses
} = require('../constants');

const placeSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
        default: undefined
    },
    description: {
        type: String,
        required: true,
        maxlength: 300,
        default: undefined
    },
    country: {
        type: String,
        required: true,
        default: undefined
    },
    city: {
        type: String,
        required: true,
        default: undefined
    },
    region: {
        type: String,
        default: undefined
    },
    district: {
        type: String,
        default: undefined
    },
    street: {
        type: String,
        required: true,
        default: undefined
    },
    house: {
        type: Number,
        required: true,
        default: undefined
    },
    apartment: {
        type: Number,
        required: true,
        default: undefined
    },
    price: {
        type: Number,
        required: true,
        default: undefined
    },
    square: {
        type: Number,
        required: true,
        default: undefined
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
    photo: {
        type: Array[String],
        required: true,
        default: undefined
    },
    rating: {
        type: Number,
        required: true,
        default: undefined
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(placeStatuses),
        default: placeStatuses.CHECKING
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.USER
    },
    owner_confirmation: {
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
