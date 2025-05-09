const express = require('express');
const cors = require('cors');
const sequelize = require('./config/mysql_db');
const matchRoutes = require('./routes/match_Routes');
require('./models/Match');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));


// ✅ Default Route
app.get('/', (req, res) => {
  res.send('🎉 Sports API is running. Use /api/matches');
});

// API Routes
app.use('/api', matchRoutes);

// MySQL connection & start server
sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected...');
    return sequelize.sync();
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to MySQL:', err);
  });
