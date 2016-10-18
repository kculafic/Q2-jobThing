
'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised')
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();
const rp = require('request-promise');

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;
    // You can now access the payload via req.token.userId
    next();
  });
};



router.post('/jobApplications', authorize, (req, res, next ) => {
  console.log(req.body);

  

  const { name } = req.body;








module.exports = router;
