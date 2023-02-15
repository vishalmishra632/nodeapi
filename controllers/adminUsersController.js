const AdminUsersService = require('../services/adminUsersService');
const RolesService = require('../services/rolesService');
const commonMessages = require('../utils/commonMessages');
const httpStatus = require('../utils/httpStatus');
const AdminUsers = require('../models/AdminUsers');

// Create a new admin user
exports.createAdminUser = async (req, res) => {
    debugger
    try {
        const role = await RolesService.getRoleById(req.body.roleType);
        if (!role) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: commonMessages.ROLE_NOT_FOUND });
        }
        const adminUser = await AdminUsersService.createAdminUser(req.body);
        res.status(httpStatus.CREATED).json(adminUser);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.INTERNAL_SERVER_ERROR });
    }
};

// Get all admin users
exports.getAllAdminUsers = async (req, res) => {
    try {
        const adminUsers = await AdminUsersService.getAllAdminUsers();
        res.status(httpStatus.OK).json(adminUsers);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.INTERNAL_SERVER_ERROR });
    }
};

// Get an admin user by ID
exports.getAdminUserById = async (req, res) => {
    try {
        const adminUser = await AdminUsersService.getAdminUserById(req.params.id);
        if (!adminUser) {
            return res.status(httpStatus.NOT_FOUND).json({ message: commonMessages.ADMIN_USER_NOT_FOUND });
        }
        res.status(httpStatus.OK).json(adminUser);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.INTERNAL_SERVER_ERROR });
    }
};

// Update an admin user
exports.updateAdminUser = async (req, res) => {
    try {
        const role = await RolesService.getRoleById(req.body.roleType);
        if (!role) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: commonMessages.ROLE_NOT_FOUND });
        }
        const adminUser = await AdminUsersService.updateAdminUser(req.params.id, req.body);
        if (!adminUser) {
            return res.status(httpStatus.NOT_FOUND).json({ message: commonMessages.ADMIN_USER_NOT_FOUND });
        }
        res.status(httpStatus.OK).json(adminUser);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.INTERNAL_SERVER_ERROR });
    }
};

// Update an admin user's status
exports.updateAdminUserStatus = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    try {
        const user = await AdminUsers.findOneAndUpdate({ _id: id }, { isActive }, { new: true });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: commonMessages.USER_NOT_FOUND });
        }
        return res.json({ message: commonMessages.ADMIN_USER_SUCCESS, data: user });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.SOMETHING_WENT_WRONG });
    }
};
