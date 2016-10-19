'use strict';

exports.seed = function(knex) {
  return knex('companies').del()
    .then(() => {
      return knex('companies').insert([{
        id: 1,
        company_id:1,
        company_name: 'Amazon',
        website: 'www.amazon.com',
        industry: 'Tech',  // youreawizard
        logo: 'https://media.glassdoor.com/sqll/6036/amazon-com-squarelogo-1432805660196.png',
        overall_rating:4
      }]);
    })
    .then(() => {
      return knex('companies').insert([{
        id: 2,
        company_id:2,
        company_name: 'G',
        website: 'www.amazon.com',
        industry: 'Tech',  // youreawizard
        logo: 'https://media.glassdoor.com/sqll/6036/amazon-com-squarelogo-1432805660196.png',
        overall_rating:4
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('companies_id_seq', (SELECT MAX(id) FROM companies));"
      );
    });
  };
