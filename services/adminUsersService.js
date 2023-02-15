
const AdminUsers = require('../models/AdminUsers');

const createAdminUser = async (adminUser) => {
    return AdminUsers.create(adminUser);
};

const getAllAdminUsers = async () => {
    return AdminUsers.find();
};

const getAdminUserById = async (id) => {
    return AdminUsers.findById(id);
};

const updateAdminUser = async (id, adminUser) => {
    return AdminUsers.findByIdAndUpdate(id, adminUser, { new: true });
};

const updateAdminUserStatus = async (id, isActive) => {
    return AdminUsers.findOneAndUpdate({ _id: id }, { isActive }, { new: true });
};

module.exports = { createAdminUser, getAllAdminUsers, getAdminUserById, updateAdminUser, updateAdminUserStatus };
