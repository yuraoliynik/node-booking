const {model, Schema} = require('mongoose');

const {
    modelNames,
    orderStatuses
} = require('../constants');

const orderSchema = new Schema({
    start_date:  {
        type: Date,
        required: true
    },
    end_date:  {
        type: Date,
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.PLACE
    },
    owner: {
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
        default: orderStatuses.CHECKING
    },
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = model(modelNames.ORDER, orderSchema);
