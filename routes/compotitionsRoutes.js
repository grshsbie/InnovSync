const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/competitions', authMiddleware, competitionController.createCompetition);
router.get('/competitions', authMiddleware, competitionController.getAllCompetitions);
router.put('/competitions/:id', authMiddleware, competitionController.updateCompetition);
router.delete('/competitions/:id', authMiddleware, competitionController.deleteCompetition);

module.exports = router;
