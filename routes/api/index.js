const express = require('express');
const router = express.Router();

const middleware = require('../middleware');

router.use(middleware.start);

router.use(middleware.end);

module.exports = router;
