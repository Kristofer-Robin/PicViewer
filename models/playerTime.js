const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/leaderboard', {
    dialect: 'mysql'
});

const PlayerTime = sequelize.define('player_time', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    watchedTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'watched_time'
    }
}, {
    timestamps: false
});

PlayerTime.sync();

module.exports = PlayerTime;
