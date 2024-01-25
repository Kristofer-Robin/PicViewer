const PlayerTime = require('../models/playerTime'); // Make sure this path is correct

async function submitTime(req, res) {
    const { name, watchedTime } = req.body;
    try {
        const newTime = await PlayerTime.create({ name, watchedTime });
        console.log('Inserted:', newTime); // Log the inserted record
        res.status(201).json(newTime);
    } catch (error) {
        console.error('Error inserting record:', error); // Log any errors
        res.status(500).json({ message: error.message });
    }
}

async function getTimes(req, res) {
    try {
        const times = await PlayerTime.findAll({
            order: [['watchedTime', 'DESC']]
        });
        res.status(200).json(times);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    submitTime,
    getTimes
};
