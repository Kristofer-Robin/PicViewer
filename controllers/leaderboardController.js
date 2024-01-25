const Score = require('../models/score');


async function getLeaderboard(req, res) {
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
}

module.exports = {
    getLeaderboard
};
