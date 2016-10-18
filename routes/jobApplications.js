
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

  router.get('/jobApplications', (req,res,next) => {
    console.log('hello');
  });

router.post('/jobApplications', authorize, (req, res, next ) => {
  console.log("helll");
  const userId = req.token.userId;
  const companyName = req.body.companyName;
  const positionTitle = req.body.positionTitle;
  const url = req.body.url;
  const location = req.body.location;
  
// where the name in the db = the name that the client inputed
  knex('companies')
    .where('company_name', companyName)
    .first()
    .then((row) => {

// if the company does NOT exist in our companyDB
      if (!row) {
      // make api request
      rp(`http://api.glassdoor.com/api/api.htm?t.p=100491&t.k=fViN5CriXem&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&q=${companyName}`)
      .then(function (company) {
       // Process company
        console.log(company);
      })
      .catch(function (err) {
       //  failed...
        next(err);
      });
    }

      else {// if the company does exist in our companyDB
        console.log('else');
         const company = camelizeKeys(rows);
         console.log(company);
         const jobApplication= { userId, positionTitle, location, url };

      knex('jobApplications')
        .insert(decamelizeKeys(jobApplication));

      }
    })
    .catch((err) => {
      next(err);
    });
});










module.exports = router;
