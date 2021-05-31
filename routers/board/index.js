const express = require('express');
const router = express.Router();
const controller = require('./board.controller');

router.get('/join', controller.join);
router.post('/join_success',controller.join_success);
router.get('/userid_check',controller.userid_check);

router.get('/login', controller.login);
router.post('/login_check', controller.login_check);
router.get('/login_success', controller.login_success);
router.get('/logout',controller.logout);

router.get('/info_delete',controller.info_delete);

module.exports = router;