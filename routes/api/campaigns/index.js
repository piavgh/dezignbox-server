const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

const createCampaign = require('./create');

router.post('/', [
    body('title', 'Title is required').exists(),
    body('description', 'Description is required').exists(),
    body('owner', 'Owner is required').exists(),
], createCampaign);

module.exports = router;
