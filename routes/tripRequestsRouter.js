const express = require('express');
const router = express.Router();
const controller = require('../controllers/tripRequestsControllers/index');
const middleware = require('../middlewares/authMiddleware');

router.get('/ambulance-types', middleware.userAuthorization([CONSTANTS.ROLE.NURSE]), controller.ambulanceType);
router.get('/trip-image', middleware.userAuthentication(), controller.getImages);
router.get('/search/:runNo', middleware.userAuthorization([CONSTANTS.ROLE.NURSE]), controller.searchTrip);
router.post('/docs/:runNo', middleware.userAuthorization([CONSTANTS.ROLE.NURSE]), controller.uploadFile);
router.delete('/docs/:runNo', middleware.userAuthorization([CONSTANTS.ROLE.NURSE]), controller.deleteFile);
router.post('/create', middleware.userAuthorization([CONSTANTS.ROLE.NURSE]), controller.createTrip);
router.patch('/dataprovided/:runNo', middleware.userAuthorization([CONSTANTS.ROLE.NURSE]), controller.dataProvided);
router.get('/chat-data/:runNo', middleware.userAuthentication(), controller.chatData);
router.get('/trips',
    middleware.userAuthorization([CONSTANTS.ROLE.NURSE, CONSTANTS.ROLE.BILLING_ADMIN]), controller.getTrips);

module.exports = router;
