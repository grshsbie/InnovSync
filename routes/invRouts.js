const express = require('express');
const router = express.Router();
const invVerifyController = require('../controllers/invController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/invverify', authMiddleware, invVerifyController.createInvVerify);

router.get('/invverify', authMiddleware, invVerifyController.getAllInvVerify);

router.get('/invverify/:id', authMiddleware, invVerifyController.getInvVerifyById);

router.put('/invverify/:id', authMiddleware, invVerifyController.updateInvVerify);

router.delete('/invverify/:id', authMiddleware, invVerifyController.deleteInvVerify);

module.exports = router;
