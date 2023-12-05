const express = require('express');
const app = express();
const port = 3000; // You can use any available port

app.use(express.json()); // For parsing application/json

// Route to handle the submission of names and times
app.post('/submit-time', (req, res) => {
    // Extract name and watched time from the request body
    const { name, watchedTime } = req.body;

    // TODO: Save the name and watched time to the database using ORM

    // Send a response back to the client
    res.status(201).send('Time submitted successfully');
});

// Route to retrieve and send all watch times and names
app.get('/times', (req, res) => {
    // TODO: Retrieve all watch times and names from the database using ORM

    // For example, assuming 'times' is the retrieved data:
    const times = [
        // Dummy data structure
        { name: 'Alice', watchedTime: 120 },
        { name: 'Bob', watchedTime: 90 },
        // ... other players
    ];

    // Send the data back to the client
    res.status(200).json(times);
});

// TODO: Add more routes here if needed

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://user:password@localhost:3306/leaderboard');

// Define your model
const PlayerTime = sequelize.define('player_time', {
    name: Sequelize.STRING,
    watchedTime: Sequelize.INTEGER
}, {
    // options
});

// Get times route
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
