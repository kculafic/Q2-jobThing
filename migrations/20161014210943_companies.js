'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', (table) => {
    table.increments();
    table.integer('company_id').notNullable();
    table.string('name').notNullable().defaultTo();
    table.string('website');
    table.string('industry');
    table.string('logo');
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies');
};
