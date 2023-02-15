const RolesService = require('../services/rolesService');
const commonMessages = require('../utils/commonMessages');
const httpStatus = require('../utils/httpStatus');
const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;
        const existingRole = await RolesService.findRoleByName(name);
        if (existingRole) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: commonMessages.ROLE_ALREADY_EXISTS });
        }
        const newRole = await RolesService.createRole(name, description, isActive);
        return res.status(httpStatus.OK).json({ message: commonMessages.ROLE_CREATE_SUCCESS, role: newRole });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.SOMETHING_WENT_WRONG });
    }
};

exports.getAllRoles = async (req, res) => {
    debugger
    try {
        const roles = await RolesService.getAllRoles();
        console.log('getAllRoles function called');
        return res.status(httpStatus.OK).json({ message: commonMessages.ROLE_GET_ALL_SUCCESS, roles });
       
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.SOMETHING_WENT_WRONG });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await RolesService.findRoleById(req.params.id);
        if (!role) {
            return res.status(httpStatus.NOT_FOUND).json({ message: commonMessages.ROLE_NOT_FOUND });
        }
        return res.status(httpStatus.OK).json({ message: commonMessages.ROLE_GET_SUCCESS, role });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.SOMETHING_WENT_WRONG });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;
        const existingRole = await RolesService.findRoleByName(name);
        if (existingRole && existingRole._id != req.params.id) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: commonMessages.ROLE_ALREADY_EXISTS });
        }
        const role = await RolesService.updateRole(req.params.id, name, description, isActive);
        if (!role) {
            return res.status(httpStatus.NOT_FOUND).json({ message: commonMessages.ROLE_NOT_FOUND });
        }
        return res.status(httpStatus.OK).json({ message: commonMessages.ROLE_UPDATE_SUCCESS, role });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.SOMETHING_WENT_WRONG });
    }
};

// Update an role status
exports.updateRoleStatus = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    try {
        const role = await Role.findOneAndUpdate({ _id: id }, { isActive }, { new: true });
        if (!role) {
            return res.status(httpStatus.NOT_FOUND).json({ message: commonMessages.ROLE_NOT_FOUND });
        }
        return res.json({ message: commonMessages.ROLE_UPDATE_SUCCESS, data: role });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: commonMessages.SOMETHING_WENT_WRONG });
    }
};

