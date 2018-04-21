const express = require('express');
const router = express.Router();

const campaignsRoutes = require('./campaigns');

router.use('/campaigns', campaignsRoutes);

module.exports = router;
