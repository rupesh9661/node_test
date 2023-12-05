const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_User, process.env.DB_Pass, {
    host: process.env.DB_Host,
    dialect: 'mysql',
    logging: false
});

try {
    sequelize.authenticate();
    console.log('database connected successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

let models = {};
models.User = require('./User')(sequelize, DataTypes);
models.Game= require('./Game')(sequelize, DataTypes);
sequelize.sync({ force: true });
module.exports = { models, sequelize }