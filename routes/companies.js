'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const rp = require('request-promise');


// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/companies', (_req, res, next) => {
  knex('companies')
    .orderBy('id')
    .then((rows) => {
      const companies = camelizeKeys(rows);

      res.send(companies);
    })
    .catch((err) => {
      next(err);
    });
});
router.get('/companies/:id', (req, res, next) => {
 knex('companies')
 .where('id', req.params.id)
 .first()
 .then((row) => {
   if (!row) {
     throw boom.create(404, 'Not Found');
   }
   const company = camelizeKeys(row);

   res.send(company);
 })
 .catch((err) => {
   next(err);
 });
 });

 router.post('/companies', (req, res, next) => {
   console.log(req.body);
  const { companyId, name, website, industry, logo } = req.body;

  // if (!title || !title.trim()) {
  //   return next(boom.create(400, 'Title must not be blank'));
  // }
  //
  // if (!artist || !artist.trim()) {
  //   return next(boom.create(400, 'Artist must not be blank'));
  // }
  //
  // if (!Number.isInteger(likes)) {
  //   return next(boom.create(400, 'Likes must be an integer'));
  // }

  const insertCompany = { companyId, name, website, industry, logo };

  knex('companies')
    .insert(decamelizeKeys(insertCompany), '*')
    .then((rows) => {
      const company = camelizeKeys(rows[0]);

      res.send(company);
    })
    .catch((err) => {
      next(err);
    });
});
 module.exports = router;
