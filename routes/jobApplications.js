
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
  router.delete('/jobApplications', (req, res, next) => {
  const jobApplicationsId = req.body.jobApplicationsId;
  return knex('job_applications')
    .delete('job_applications')
    .where('id',jobApplicationsId)
    .then((jobCollection) => {
      res.send(true);
    })
    .catch((err) => {
     res.send(false);
   });
  });
  router.get('/jobApplications', authorize, (req,res,next) => {
    const userId = req.token.userId;
    knex('job_applications')
    .innerJoin('companies', 'companies.id', 'job_applications.company_id')
    .where('user_id', userId)
    .then((jobCollection) => {

      // console.log(jobCollection);
      res.send(jobCollection);
    })
    .catch((err) => {
     next(err);
   });
  });


router.post('/jobApplications', authorize, (req, res, next ) => {

  // req.token.userId;
  const userId = req.token.userId;
  const companyName = req.body.companyName;
  const positionTitle = req.body.position;
  const url = req.body.url;
  const location = req.body.location;
  const dateApplied = req.body.date;

  knex('companies')
    .where('company_name', companyName)
    .then((exists) => {

    if(exists.length <= 0){
      console.log('request');
      rp(`http://api.glassdoor.com/api/api.htm?t.p=100491&t.k=fViN5CriXem&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&q=${companyName}`)
        .then(function (companies) {

          const company = JSON.parse(companies);

          let companyId = company.response.employers[0].id;
          const website =  company.response.employers[0].website;
          const industry =  company.response.employers[0].industry;
          const logo =  company.response.employers[0].squareLogo;
          const overallRating = parseFloat(company.response.employers[0].overallRating);
          const cultureAndValuesRating = parseFloat(company.response.employers[0].cultureAndValuesRating);
          const seniorLeadershipRating = parseFloat(company.response.employers[0].seniorLeadershipRating);
          const compensationAndBenefitsRating = parseFloat(company.response.employers[0].compensationAndBenefitsRating);
          const careerOpportunitiesRating = parseFloat(company.response.employers[0].careerOpportunitiesRating);
          const workLifeBalanceRating = parseFloat(company.response.employers[0].workLifeBalanceRating);
          const reviewJobTitle = company.response.employers[0].featuredReview.jobTitle;
          const reviewJobLocation = company.response.employers[0].featuredReview.location;
          const reviewHeadline = company.response.employers[0].featuredReview.headline;
          const pros = company.response.employers[0].featuredReview.pros;
          const cons = company.response.employers[0].featuredReview.cons;

          return knex.transaction(function (t) {
          return knex('companies')
            .transacting(t)
            .insert(decamelizeKeys({
              companyId,
              companyName,
              website,
              industry,
              logo,
              overallRating,
              cultureAndValuesRating,
              seniorLeadershipRating,
              compensationAndBenefitsRating,
              careerOpportunitiesRating,
              workLifeBalanceRating,
              reviewJobTitle,
              reviewJobLocation,
              reviewHeadline,
              pros,
              cons
              }))
            .returning('id')
            .then(function (response) {
              // console.log(response[0]);
              let companyId = response[0];
              console.log(companyId);
              return knex('job_applications')
                .transacting(t)
                .insert(decamelizeKeys({
                  userId,
                  companyId,
                  positionTitle,
                  location,
                  url,
                  dateApplied
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
            let companyId = response[0].id;
            return knex('job_applications')
              .transacting(t)
              .insert(decamelizeKeys({
                userId,
                companyId,
                positionTitle,
                location,
                url,
                dateApplied
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
      // transaction failed, data rolled back
        res.send(false);
      });
    }
  });//catch fpr first
});


module.exports = router;
