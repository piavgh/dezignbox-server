const express = require('express');
const router = express.Router();

const getTransactions = require('./list');

router.get('/', getTransactions);

module.exports = router;
