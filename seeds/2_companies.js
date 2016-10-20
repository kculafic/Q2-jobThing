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
        overall_rating:4,
        culture_and_values_rating:2,
        senior_leadership_rating:3,
        compensation_and_benefits_rating:4,
        career_opportunities_rating:2,
        work_life_balance_rating:4,
        review_job_title:'Software dev',
        review_job_location:'Seattle',
        review_headline:'This company',
        pros:'I love the people',
        cons:'I hate you'

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
        overall_rating:4.5,
        culture_and_values_rating:2,
        senior_leadership_rating:3,
        compensation_and_benefits_rating:4,
        career_opportunities_rating:2,
        work_life_balance_rating:4,
        review_job_title:'Software dev',
        review_job_location:'Seattle',
        review_headline:'This company',
        pros:'I love the people',
        cons:'I hate you'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('companies_id_seq', (SELECT MAX(id) FROM companies));"
      );
    });
  };
