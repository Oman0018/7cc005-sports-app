const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match_Controller');
const upload = require('../middlewares/upload');

// Two files uploaded: teamOneLogo and teamTwoLogo
router.post(
  '/CreateMatches',
  upload.fields([
    { name: 'TeamOneLogo', maxCount: 1 },
    { name: 'TeamTwoLogo', maxCount: 1 }
  ]),
  matchController.createMatch
);


// GET all matches
router.get('/matches', matchController.getAllMatches);

// DELETE match
router.delete('/matches/:id', matchController.deleteMatch);

// GET match by ID
router.get('/matches/:id', matchController.getMatchById);


// UPDATE match
router.put(
  '/matches/:id',
  upload.fields([
    { name: 'TeamOneLogo', maxCount: 1 },
    { name: 'TeamTwoLogo', maxCount: 1 }
  ]),
  matchController.updateMatch
);

module.exports = router;
