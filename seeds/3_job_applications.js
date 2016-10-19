'use strict';
exports.seed = function(knex) {
  return knex('job_applications').del()
    .then(() => {
      return knex('job_applications').insert([{
        id: 1,
        user_id: 1,
        company_id: 1,
        position_title:'Software Developer',
        location: 'Seattle, WA',
        url:'www.amazon.com/jobs',
        interview:true,
        notes:'Study hard',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
        date_applied:new Date('2016-10-19')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('job_applications_id_seq', (SELECT MAX(id) FROM job_applications));"
      );
    });
  };
