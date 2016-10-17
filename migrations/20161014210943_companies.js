'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', (table) => {
    table.increments();
    table.integer('company_id').notNullable();
    table.string('name').notNullable().defaultTo();
    table.string('website').notNullable().defaultTo();
    table.string('industry').notNullable().unique();
    table.string('logo').nullable();
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies');
};
