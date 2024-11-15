const express = require('express');
const router = express.Router();
const ritUserController = require('../controllers/ritUserController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/rit-users', authMiddleware, ritUserController.createRitUser);
router.get('/rit-users', authMiddleware, ritUserController.getAllRitUsers);
router.put('/rit-users/:id', authMiddleware, ritUserController.updateRitUser);
router.delete('/rit-users/:id', authMiddleware, ritUserController.deleteRitUser);

module.exports = router;
