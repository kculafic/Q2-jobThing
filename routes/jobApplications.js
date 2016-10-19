
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
    knex('job_applications')
    .where('user_id', 1)
    .then((jobCollection) => {

      // console.log(jobCollection);


      res.send(jobCollection);
    })
    .catch((err) => {
     next(err);
   });
  });


router.post('/jobApplications', authorize, (req, res, next ) => {
  console.log("helll");
  // req.token.userId;
  const userId = 1;
  const companyName = req.body.companyName;
  const positionTitle = req.body.position;
  const url = req.body.url;
  const location = req.body.location;

  knex('companies')
    .where('company_name', companyName)
    .then((exists) => {

    if(exists.length <= 0){
      console.log('request');
      rp(`http://api.glassdoor.com/api/api.htm?t.p=100491&t.k=fViN5CriXem&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&q=${companyName}`)
        .then(function (companies) {
         // Process company
          // console.log(companies);
          const company = JSON.parse(companies);
          // console.log(company.response.employers[0]);
          // res.send(true);
          const companyId = company.response.employers[0].id;
          const website =  company.response.employers[0].website;
          const industry =  company.response.employers[0].industry;
          const logo =  company.response.employers[0].squareLogo;
          const overallRating = parseInt(company.response.employers[0].overallRating);
          return knex.transaction(function (t) {
          return knex('companies')
            .transacting(t)
            .insert(decamelizeKeys({
              companyId,
              companyName,
              website,
              industry,
              logo,
              overallRating
              }))
            .returning('id')
            .then(function (response) {
              // console.log(response[0]);
              const companyId = response[0];
              console.log(companyId);
              return knex('job_applications')
                .transacting(t)
                .insert(decamelizeKeys({
                  userId,
                  companyId,
                  positionTitle,
                  location,
                  url
                }));
            })
            .then(t.commit)
            .catch(t.rollback)
        })
        .then(function () {
          // transaction suceeded, data written
          res.send(true);
        })
        .catch(function () {
          // transaction failed, data rolled back
          console.log('d');
          res.send(false);
        });
      }).catch(function (err) {
        console.log(err);
      })
    }
    else {
      return knex.transaction(function (t) {
        return knex('companies')
          .transacting(t)
          .where('company_name', companyName)
          .then(function (response) {
            const companyId = response[0].id;
            return knex('job_applications')
              .transacting(t)
              .insert(decamelizeKeys({
                userId,
                companyId,
                positionTitle,
                location,
                url
              }))
          })
          .then(t.commit)
          .catch(t.rollback)
        })
    .then(function () {
      // transaction suceeded, data written
      res.send(true);
    })
    .catch(function () {
      console.log('ff');
      // transaction failed, data rolled back
        res.send(false);
      });
    }
  });//catch fpr first
});


module.exports = router;
