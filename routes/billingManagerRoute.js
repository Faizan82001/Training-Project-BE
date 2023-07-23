const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/authMiddleware');
const analyticsController = require('../controllers/analyticsDashboardControllers/index');
const usersController = require('../controllers/userControllers/index');

router.post('/user', middleware.userAuthorization([CONSTANTS.ROLE.BILLING_MNG]), usersController.createUserController);
router.get('/users', middleware.userAuthorization([CONSTANTS.ROLE.BILLING_MNG]), usersController.userListController);
router.get('/total-requests', middleware.userAuthorization([CONSTANTS.ROLE.BILLING_MNG]), analyticsController.totalRequestsController);
router.get('/avg-time-taken', middleware.userAuthorization([CONSTANTS.ROLE.BILLING_MNG]), analyticsController.avgTimeTakenController);
router.get('/list-billing-admin', middleware.userAuthorization([CONSTANTS.ROLE.BILLING_MNG]),
    analyticsController.listBillingAdminController);
router.get('/performance-counter', middleware.userAuthorization([CONSTANTS.ROLE.BILLING_MNG]),
    analyticsController.performanceCounterController);
module.exports = router;
router.patch('/users/activity-status/:userId', middleware.userAuthorization([CONSTANTS.ROLE.BILLING_MNG]), usersController.changeUserStatusController);
module.exports = router;
