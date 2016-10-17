'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const path = require('path');
app.disable('x-powered-by');

app.use(express.static(path.join('public')));

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const users = require('./routes/users');
const companies = require('./routes/companies');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('short'));
app.use(users);
app.use(companies);

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
})

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
