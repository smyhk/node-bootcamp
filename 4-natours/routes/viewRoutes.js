const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

// Render base template
router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);

// Login
router.get('/login', viewController.getLoginForm);

module.exports = router;
