const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const middleware = require('../middlewares/authMiddleware');

router.post('/login', controller.login);
router.post('/change-password', middleware.userAuthentication(), controller.changePassword);
router.post('/forgot-password', controller.forgotPassword);
router.post('/set-password/:token', controller.setPassword);
router.post('/logout', controller.logOutUser);
router.patch('/set-fcm-token', middleware.userAuthentication(), controller.setFCMToken);

module.exports = router;
