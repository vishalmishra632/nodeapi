const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

router.post('/', rolesController.createRole);
router.get('/', rolesController.getAllRoles);
router.get('/:id', rolesController.getRoleById);
router.put('/:id', rolesController.updateRole);
router.patch('/:id', rolesController.updateRoleStatus);

module.exports = router;
