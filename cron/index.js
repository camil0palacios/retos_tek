const services = require('../services/index');
const cron = require('node-cron');

var task = cron.schedule('*/10 * * * *', () => {
    services.saveData();
}, {
    scheduled: false
});

module.exports = task;