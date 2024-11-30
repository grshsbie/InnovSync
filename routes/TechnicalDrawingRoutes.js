const express = require('express');
const router = express.Router();
const ritTechnicalDrawController = require('../controllers/ritTechnicalDrawController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/technical-draw', authMiddleware, ritTechnicalDrawController.createProduct);
router.get('/technical-draw', authMiddleware, ritTechnicalDrawController.getAllProducts);
router.put('/technical-draw/:id', authMiddleware, ritTechnicalDrawController.updateProduct);
router.delete('/technical-draw/:id', authMiddleware, ritTechnicalDrawController.deleteProduct);

module.exports = router;
