const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profile');
const authenticateToken = require('../middlewares/auth');

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);

module.exports = router;
