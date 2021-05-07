const { urlencoded } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 8080 || process.env.PORT;
const routes = require('../routes/index');
const task = require('../cron/index');

// cron jobs reto 2
task.start();

app.set('port', port);
// middlewares
app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(cors());
app.use(express.json());
// routes
app.use('/api', routes);

module.exports = app;