const {model, Schema} = require('mongoose');

const {
    actionTokenTypes,
    modelNames
} = require('../constants');

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(actionTokenTypes)
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.USER
    }
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = model(modelNames.ACTION_TOKEN, actionTokenSchema);
