const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    canvasObject: {
        type: String
    },
    originalImageUrl: {
        type: String
    },
    thumbnailImageUrl: {
        type: String
    }
});

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;
