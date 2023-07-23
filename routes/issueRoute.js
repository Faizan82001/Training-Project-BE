const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/requestIssueControllers/index');

router.post('/', middleware.userAuthorization([CONSTANTS.ROLE.NURSE]), controller.requestIssuesController);
router.get('/issue-list', middleware.userAuthorization([CONSTANTS.ROLE.NURSE]), controller.listIssueController);
module.exports = router;
