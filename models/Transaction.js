const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  transactionId: {
    type: String,
    required: true
  },
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
  phone: {
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

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
