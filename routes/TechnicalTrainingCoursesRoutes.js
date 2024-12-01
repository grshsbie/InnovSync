const express = require('express');
const router = express.Router();
const technicalTrainingCoursesController = require('../controllers/technicalTrainingCoursesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/training-courses', authMiddleware, technicalTrainingCoursesController.createProduct);
router.get('/training-courses', authMiddleware, technicalTrainingCoursesController.getAllProducts);
router.put('/training-courses/:id', authMiddleware, technicalTrainingCoursesController.updateProduct);
router.delete('/training-courses/:id', authMiddleware, technicalTrainingCoursesController.deleteProduct);

module.exports = router;
