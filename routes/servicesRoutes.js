const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/services', authMiddleware, servicesController.createService);
router.get('/services', authMiddleware, servicesController.getAllServices);
router.put('/services/:id', authMiddleware, servicesController.updateService);
router.delete('/services/:id', authMiddleware, servicesController.deleteService);

module.exports = router;
