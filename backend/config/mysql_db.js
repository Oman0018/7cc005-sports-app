const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sports_statistics_hub', 'root', '', {
    host: '127.0.0.1',   // Use 127.0.0.1 instead of 'localhost'
    port: 3307,     // Port set in XAMPP
    dialect: 'mysql'
});

module.exports = sequelize;
