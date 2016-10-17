'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/job_thing'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/job_thing'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
