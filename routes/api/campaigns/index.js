const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

const getCampaigns = require('./list');
const createCampaign = require('./create');

// Routes
router.get('/', [
  query('userId', 'User ID is required').exists()
], getCampaigns);

router.post('/', [
  body('title', 'Title is required').exists(),
  body('description', 'Description is required').exists(),
  body('owner', 'Owner is required').exists(),
], createCampaign);

module.exports = router;
