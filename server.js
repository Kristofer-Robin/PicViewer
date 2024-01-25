const express = require('express');
const path = require('path');
const cors = require('cors');
const Sequelize = require('sequelize');
const app = express();
const port = 3000;

// Import controllers
const timesController = require('./controllers/timesController');
const leaderboardController = require('./controllers/leaderboardController');

const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/leaderboard', {
    dialect: 'mysql'
});

app.use(cors());
app.use(express.json());
app.use(express.static('assets'));
app.get('/api/leaderboard', leaderboardController.getLeaderboard);
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.post('/submit-time', timesController.submitTime);
app.get('/times', timesController.getTimes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
