'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/users', (req, res, next) => {
  knex('users')
    .orderBy('id')
    .then((rows) => {
      const users = camelizeKeys(rows);

      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/:id', (req, res, next) => {
  knex('users')
  .where('id', req.params.id)
  .first()
  .then((row) => {
    if (!row) {
      throw boom.create(404, 'Not Found');
    }
    const user = camelizeKeys(row);

    res.send(user);
  })
  .catch((err) => {
    next(err);
  });
});

router.post('/users', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !firstName.trim()) {
    return next(boom.create(400, 'First name must not be blank'));
  }

  if (!lastName || !lastName.trim()) {
    return next(boom.create(400, 'Last name must not be blank'));
  }

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must be at least 8 characters long'));
  }

  bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      const insertUser = { firstName, lastName, email, hashedPassword };

      return knex('users').insert(decamelizeKeys(insertUser), '*');
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);

      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
