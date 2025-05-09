const Match = require('../models/Match');

// CREATE
exports.createMatch = async (req, res) => {
  try {
    const {
      TeamOneName,
      TeamOneScore,
      TeamTwoName,
      TeamTwoScore,
      DateOfMatch,
      Competition
    } = req.body;

    const TeamOneLogo = req.files?.TeamOneLogo?.[0]?.filename || null;
    const TeamTwoLogo = req.files?.TeamTwoLogo?.[0]?.filename || null;

    const newMatch = await Match.create({
      TeamOneName,
      TeamOneScore,
      TeamTwoName,
      TeamTwoScore,
      DateOfMatch,
      Competition,
      TeamOneLogo,
      TeamTwoLogo
    });

    res.status(201).json({ message: 'Match created', match: newMatch });
  } catch (error) {
    console.error('Create Match Error:', error);
    res.status(500).json({ message: 'Failed to create match', error });
  }
};

// READ ALL
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch matches', error });
  }
};

// GET match by ID
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error('❌ Error fetching match by ID:', error);
    res.status(500).json({ message: 'Failed to get match', error });
  }
};


// DELETE
exports.deleteMatch = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Match.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: 'Match deleted' });
    } else {
      res.status(404).json({ message: 'Match not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting match', error });
  }
};

// UPDATE
exports.updateMatch = async (req, res) => {
  try {
    const id = req.params.id;
    const match = await Match.findByPk(id);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    const {
      TeamOneName,
      TeamOneScore,
      TeamTwoName,
      TeamTwoScore,
      DateOfMatch,
      Competition
    } = req.body;

    const updatedFields = {
      TeamOneName,
      TeamOneScore,
      TeamTwoName,
      TeamTwoScore,
      DateOfMatch,
      Competition
    };

    if (req.files?.TeamOneLogo) {
      updatedFields.TeamOneLogo = req.files.TeamOneLogo[0].filename;
    }
    if (req.files?.TeamTwoLogo) {
      updatedFields.TeamTwoLogo = req.files.TeamTwoLogo[0].filename;
    }

    await match.update(updatedFields);
    res.status(200).json({ message: 'Match updated', match });
  } catch (error) {
    console.error('Update Match Error:', error);
    res.status(500).json({ message: 'Update failed', error });
  }
};
