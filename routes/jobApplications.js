
'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised')
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();
const rp = require('request-promise');

router.post('/jobApplications', /* AUTHORIZE, */ (req, res, next ) => {
  console.log(req.body);

  const { name } = req.body;








module.exports = router;
