exports.up = function(knex, Promise) {
  return knex.schema.table('job_applications', function(table){
    table.date('date_applied');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('job_applications', function(table){
      table.dropColumn('date_applied');
    })
};
