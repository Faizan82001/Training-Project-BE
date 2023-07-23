const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/authMiddleware');
const billingAdminController = require('../controllers/billingAdminControllers/index');

router.get('/requests', middleware
    .userAuthorization([CONSTANTS.ROLE.BILLING_MNG, CONSTANTS.ROLE.BILLING_ADMIN]), billingAdminController.requestListController);
router.patch('/change-status/:runNo', middleware
    .userAuthorization([CONSTANTS.ROLE.BILLING_ADMIN]), billingAdminController.changeStatusAssignUnAssign);
router.post('/request-more-info/:runNo', middleware
    .userAuthorization([CONSTANTS.ROLE.BILLING_ADMIN]), billingAdminController.requestMoreInformation);
router.post('/approve-with-exception/:runNo', middleware
    .userAuthorization([CONSTANTS.ROLE.BILLING_ADMIN]), billingAdminController.approveWithException);
router.get('/patient/:runNo', middleware
    .userAuthorization([CONSTANTS.ROLE.BILLING_ADMIN, CONSTANTS.ROLE.BILLING_MNG]), billingAdminController.patientDetails);

router.patch(
    '/approve-request',
    middleware.userAuthorization([CONSTANTS.ROLE.BILLING_ADMIN]), billingAdminController.approveRequests
);
module.exports = router;
