'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', (table) => {
    table.increments();
    table.integer('company_id').notNullable();
    table.string('company_name').notNullable().defaultTo();
    table.string('website');
    table.string('industry');
    table.string('logo');
    table.integer('overall_rating');
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies');
};
// knex('companies')
//   .where('company_name', companyName)
//   .first()
//   .then((row) => {
//
// // if the company does NOT exist in our companyDB
//     if (!row) {
//     // make api request
//     rp(`http://api.glassdoor.com/api/api.htm?t.p=100491&t.k=fViN5CriXem&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&q=${companyName}`)
//     .then(function (company) {
//      // Process company
//      return company;
//       console.log(company);
//     })
//     .catch(function (err) {
//      //  failed...
//       next(err);
//     });
//   }
//
//     else {// if the company does exist in our companyDB
//       console.error(err);
//        const company = camelizeKeys(rows);
//        console.log(company);
//        const jobApplication= { userId, positionTitle, location, url };
//
//     knex('jobApplications')
//       .insert(decamelizeKeys(jobApplication))
//       .then(function (c){
//         res.status(200);
//       })
//       .catch((err) => {
//         next(err);
//       });
//
//     }
//   })
//   .catch((err) => {
//     next(err);
//   });
// }).catch((err) => {
//       next(err);
//     });
// .insert(decamelizeKeys({
//   companyId,
//   companyName,
//   website,
//   industry,
//   logo,
//   overallRating
//   }))
