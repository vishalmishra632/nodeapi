const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    modifiedDate: { type: Date, default: Date.now },
    modifiedBy: { type: String, default: 'system' }
});

module.exports = mongoose.model('Roles', rolesSchema);
