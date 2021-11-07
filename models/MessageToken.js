const {model, Schema} = require('mongoose');

const {
    messageTokenTypes,
    modelNames
} = require('../constants');

const messageTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(messageTokenTypes)
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

module.exports = model(modelNames.MESSAGE_TOKEN, messageTokenSchema);
