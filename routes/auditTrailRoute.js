const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/authMiddleware');
const auditTrailController = require('../controllers/auditTrailControllers/index');

router.get('/list/:runNo', middleware
    .userAuthorization([CONSTANTS.ROLE.BILLING_MNG, CONSTANTS.ROLE.BILLING_ADMIN]), auditTrailController.listAuditTrail);


module.exports = router;
