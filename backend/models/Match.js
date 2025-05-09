const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql_db');

const Match = sequelize.define('match_result', {
  TeamOneName: {
    type: DataTypes.STRING,
  },
  TeamOneLogo: {
    type: DataTypes.STRING,
  },
  TeamOneScore: {
    type: DataTypes.INTEGER,
  },
  TeamTwoName: {
    type: DataTypes.STRING,
  },
  TeamTwoLogo: {
    type: DataTypes.STRING,
  },
  TeamTwoScore: {
    type: DataTypes.INTEGER,
  },
  DateOfMatch: {
    type: DataTypes.STRING,
  },
  Competition: {
    type: DataTypes.STRING,
  },
});

module.exports = Match;
