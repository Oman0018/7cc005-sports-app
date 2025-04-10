const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const matchRoutes = require('./routes/matchRoutes');     // ✅ Matches
const teamRoutes = require('./routes/teamRoutes');       // ✅ Teams
const userRoutes = require('./routes/userRoutes');       // ✅ Users
const playerRoutes = require('./routes/playerRoutes');   // ✅ Players

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Mount API routes
app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/users', userRoutes);
app.use('/api/players', playerRoutes);

// ✅ Global error handler
app.use(errorMiddleware);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
