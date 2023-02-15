const express = require('express');
const router = express.Router();
const adminUsersController = require('../controllers/adminUsersController');

router.post('/', adminUsersController.createAdminUser);
router.get('/', adminUsersController.getAllAdminUsers);
router.get('/:id', adminUsersController.getAdminUserById);
router.put('/:id', adminUsersController.updateAdminUser);
router.patch('/:id', adminUsersController.updateAdminUserStatus);

module.exports = router;
