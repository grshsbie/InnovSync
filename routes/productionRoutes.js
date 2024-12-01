const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/manufacturers', authMiddleware, manufacturerController.createManufacturer);

router.get('/manufacturers', authMiddleware, manufacturerController.getAllManufacturers);

router.put('/manufacturers/:id', authMiddleware, manufacturerController.updateManufacturer);

router.delete('/manufacturers/:id', authMiddleware, manufacturerController.deleteManufacturer);

module.exports = router;
