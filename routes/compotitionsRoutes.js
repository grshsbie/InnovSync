const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/competitions', authMiddleware, competitionController.createCompetition);
router.get('/competitions', authMiddleware, competitionController.getAllCompetitions);
router.get('/competitions/:id', authMiddleware, competitionController.getCompetitionById);
router.put('/competitions/:id', authMiddleware, competitionController.updateCompetition);
router.delete('/competitions/:id', authMiddleware, competitionController.deleteCompetition);


// commit: add getCompetitionById controller for retrieving single competition detail


module.exports = router;
