const mongoose = require('mongoose');

const adminUsersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    emailId: { type: String, required: true },
    address: { type: String, required: true },
    phoneNo: { type: String, required: true },
    userImage: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: { type: String, required: true },
    roleType: { type: String, required: true },
    password: { type: String, required: true }
}, {
    collection: 'AdminUsers' // Set the collection name to AdminUsers
});

const AdminUsers = mongoose.model('AdminUsers', adminUsersSchema);

module.exports = AdminUsers;


