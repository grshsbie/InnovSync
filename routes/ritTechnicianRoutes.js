const express = require('express');
const router = express.Router();
const ritTechnicianController = require('../controllers/ritTechnicianController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/rit-technicians', authMiddleware, ritTechnicianController.createRitTechnician);
router.get('/rit-technicians', authMiddleware, ritTechnicianController.getAllRitTechnicians);
router.put('/rit-technicians/:id', authMiddleware, ritTechnicianController.updateRitTechnician);
router.delete('/rit-technicians/:id', authMiddleware, ritTechnicianController.deleteRitTechnician);

module.exports = router;
