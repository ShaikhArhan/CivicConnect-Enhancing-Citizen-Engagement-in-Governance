const express = require('express');
const router = express.Router();
const problemController = require('../controllers/ProblemController');
const authMiddleware = require('../middleware/LoginMiddleware');

router.post('/addProblem', authMiddleware.authMiddleware, problemController.addProblem);
router.get('/getAllProblem', authMiddleware.authMiddleware, problemController.getAllProblem);
router.get('/getProblemById/:key/:value', authMiddleware.authMiddleware, problemController.getProblemById);
router.delete('/deleteProblem/:id', problemController.deleteProblem);
router.put('/updateProblemById/:id', authMiddleware.authMiddleware, problemController.getProblemByIdUpdate);

router.get('/getAllProblem-admin', problemController.getAllProblem);
router.put('/updateProblem-admin/:id', problemController.updateProblem);
router.put('/updateProblemById-admin/:id', problemController.getProblemByIdUpdate);
router.get('/getProblemById-admin/:key/:value', problemController.getProblemById);


module.exports = router;
