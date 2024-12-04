const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/projects', authMiddleware, projectController.createProduct);
router.get('/projects', authMiddleware, projectController.getAllProducts);
router.put('/projects/:id', authMiddleware, projectController.updateProduct);
router.delete('/projects/:id', authMiddleware, projectController.deleteProduct);

module.exports = router;
