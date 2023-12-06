const express = require('express');
const path = require('path');
const cors = require('cors');
const Sequelize = require('sequelize');
const app = express();
const port = 3000;


const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/leaderboard', {
    dialect: 'mysql'
});

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

// Serve static files from the 'assets' directory
app.use(express.static('assets'));

// Endpoint to get leaderboard scores
app.get('/api/leaderboard', async (req, res) => {
    try {
        const scores = await Score.findAll({
            order: [['score', 'DESC']],
            limit: 10
        });
        res.json(scores);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).send({ error: error.message });
    }
});

// Model definition for the leaderboard
const PlayerTime = sequelize.define('player_time', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    watchedTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Specify the actual column name in the database here
        field: 'watched_time'
    }
}, {
    timestamps: false // Disable the automatic creation of createdAt & updatedAt fields
});

// Sync the model with the database
PlayerTime.sync();

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from the project root directory
app.use(express.static(path.join(__dirname)));

// Route to handle form submissions
app.post('/submit-time', async (req, res) => {
    const { name, watchedTime } = req.body;

    try {
        const newTime = await PlayerTime.create({
            name,
            watchedTime
        });
        console.log('Inserted:', newTime); // Log the inserted record
        res.status(201).json(newTime);
    } catch (error) {
        console.error('Error inserting record:', error); // Log any errors
        res.status(500).json({ message: error.message });
    }
});

// Route to retrieve and send all watch times and names
app.get('/times', async (req, res) => {
    try {
        const times = await PlayerTime.findAll({
            order: [['watchedTime', 'DESC']]
        });
        res.status(200).json(times);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
