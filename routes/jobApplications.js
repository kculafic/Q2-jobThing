
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
  const userId = req.token.userId;
  const companyName = req.body.companyName;
  const positionTitle = req.body.positionTitle;
  const url = req.body.url;
  const location = req.body.location;

// where the name in the db = the name that the client inputed
  knex('companies')
    .where('companyName', companyName)
    .first()
    .then((row) => {
// if the company does NOT exist in our companyDB
      if (!row) {
      // make api request

      }

      else {// if the company does exist in our companyDB
         const company = camelizeKeys(rows);
         const jobApplication= { userId, company.id, positionTitle, location, url };

      knex('jobApplications')
        .insert(decamelizeKeys(jobApplication);

      }
    })
    .catch((err) => {
      next(err);
    });
});


  const { name } = req.body;








module.exports = router;
