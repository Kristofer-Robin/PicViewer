const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/leaderboard', {
    dialect: 'mysql'
});

const Score = sequelize.define('score', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Score.sync();

module.exports = Score;
