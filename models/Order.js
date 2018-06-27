const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  numberOfItems: {
    type: Number,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: Number,
    required: true
  },
  shippingMethod: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
}, {timestamps: {}});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
