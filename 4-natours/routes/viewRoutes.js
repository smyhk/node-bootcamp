const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

// Render base template
router.get('/', viewController.getOverview);
router.get('/tour', viewController.getTour);

module.exports = router;
