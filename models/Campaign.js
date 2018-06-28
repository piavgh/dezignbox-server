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
  status: {
    type: Number, // 1: Active, 2: Inactive, 9: Deleted
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  canvasDataUrl: {
    type: String
  },
  originalImageUrl: {
    type: String
  },
  thumbnailImageUrl: {
    type: String
  }
}, {timestamps: {}});

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;
