const {model, Schema} = require('mongoose');

const {
    modelNames,
    orderStatuses
} = require('../constants');

const orderSchema = new Schema({
    start_date: {
        type: Date,
        required: true
    },
    count_days: {
        type: Number,
        required: true,
        default: 1
    },
    sum: {
        type: Number,
        required: true
    },
    count_persons: {
        type: Number,
        required: true,
        default: 1
    },
    place: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.PLACE
    },
    holder: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.USER
    },
    guest: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.USER
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(orderStatuses),
        default: orderStatuses.AWAITING_CONFIRMATION
    },
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = model(modelNames.ORDER, orderSchema);
