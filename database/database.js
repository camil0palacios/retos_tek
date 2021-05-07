const { Sequelize } = require('sequelize');
const db_conf = require('../conf/db_keys.json');

const sequelize = new Sequelize(
    db_conf.database,
    db_conf.username, 
    db_conf.password,
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
);

module.exports = sequelize;