const express = require('express');
const router = express.Router();
const introducerController = require('../controllers/introducerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/introducers', authMiddleware, introducerController.createIntroducer);
router.get('/introducers', authMiddleware, introducerController.getAllIntroducers);
router.put('/introducers/:id', authMiddleware, introducerController.updateIntroducer);
router.delete('/introducers/:id', authMiddleware, introducerController.deleteIntroducer);

module.exports = router;
