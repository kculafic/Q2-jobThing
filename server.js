'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
require('dotenv').config();

const path = require('path');
app.disable('x-powered-by');

app.get('env');
app.use(express.static(path.join('public')));

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const users = require('./routes/users');
const companies = require('./routes/companies');
const token = require('./routes/token');
const jobApplications = require('./routes/jobApplications');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('short'));
app.use(users);
app.use(companies);
app.use(token);
app.use(jobApplications);

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port);
});

module.exports = app;
