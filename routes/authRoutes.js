const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const commonMessages = require('../utils/commonMessages');


const router = express.Router();

router.post(
    '/login',
    [
        body('emailId').isEmail().withMessage(commonMessages.INVALID_EMAIL),
        body('password')
            .trim()
            .notEmpty()
            .withMessage(commonMessages.PASSWORD_EMPTY),
    ],
    authController.login
);

module.exports = router;