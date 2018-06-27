const express = require('express');
const router = express.Router();

const campaignsRoutes = require('./campaigns');
const ordersRoutes = require('./orders');

router.use('/campaigns', campaignsRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;
