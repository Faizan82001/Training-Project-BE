const express = require('express');
const router = express.Router();
const controller = require('../controllers/ocrControllers/index');
const middleware = require('../middlewares/lambdaMiddleware');

router.post('/face-sheet', middleware.lamdaAuthentication, controller.faceSheetData);
router.post('/pcs', middleware.lamdaAuthentication, controller.pcsData);

module.exports = router;
