const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const AdminUsers = require('../models/AdminUsers');
const authService = require('../services/authService');
const commonMessages = require('../utils/commonMessages');
const httpStatus = require('../utils/httpStatus');



exports.login = async (req, res, next) => {
    debugger
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMsg = errors.array().map((err) => `${err.msg}`).join(', ');
            const error = new Error(errMsg);
            error.httpStatusCode = httpStatus.BAD_REQUEST;
            throw error;
        }

        const { emailId, password } = req.body;
        const adminUsers = await AdminUsers.findOne({ emailId });


        if (!adminUsers) {
            const error = new Error(commonMessages.INVALID_EMAIL);
            error.httpStatusCode = httpStatus.UNAUTHORIZED;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, adminUsers.password);
        if (!isMatch) {
            console.log(commonMessages);
            const error = new Error(commonMessages.INVALID_PASSWORD);
            error.httpStatusCode = httpStatus.UNAUTHORIZED;
            throw error;
        }

        const token = authService.signToken(adminUsers.id, adminUsers.roleType);

        res.status(httpStatus.OK).json({
            message: commonMessages.LOGIN_SUCESSFUL,
            token,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
