const Role = require('../models/Role');

exports.createRole = async (roleData) => {
    try {
        const role = new Role(roleData);
        const newRole = await role.save();
        return newRole;
    } catch (error) {
        throw error;
    }
};

exports.getAllRoles = async () => {
    try {
        const roles = await Role.find({});
        return roles;
    } catch (error) {
        throw error;
    }
};

exports.findRoleById = async (id) => {
    try {
        const role = await Role.findById(id);
        return role;
    } catch (error) {
        throw error;
    }
};

exports.findRoleByName = async (name) => {
    try {
        const role = await Role.findOne({ name });
        return role;
    } catch (error) {
        throw error;
    }
};

exports.updateRole = async (id, roleData) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(id, roleData, { new: true });
        return updatedRole;
    } catch (error) {
        throw error;
    }
};
