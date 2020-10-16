const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

// Render base template
router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);

// Login
router.get('/login', viewController.getLoginForm);

module.exports = router;
