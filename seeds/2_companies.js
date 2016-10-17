'use strict';

exports.seed = function(knex) {
  return knex('companies').del()
    .then(() => {
      return knex('companies').insert([{
        id: 1,
        company_id:1,
        name: 'Amazon',
        website: 'www.amazon.com',
        industry: 'Tech',  // youreawizard
        logo: 'https://media.glassdoor.com/sqll/6036/amazon-com-squarelogo-1432805660196.png'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('companies_id_seq', (SELECT MAX(id) FROM companies));"
      );
    });
  };
