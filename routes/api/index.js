const express = require('express');
const router = express.Router();

const campaignsRoutes = require('./campaigns');
const transactionsRoutes = require('./transactions');

router.use('/campaigns', campaignsRoutes);
router.use('/transactions', transactionsRoutes);

module.exports = router;
