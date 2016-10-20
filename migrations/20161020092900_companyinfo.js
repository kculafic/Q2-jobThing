exports.up = function(knex, Promise) {
  return knex.schema.table('companies', function(table){
    table.float('culture_and_values_rating');
    table.float('senior_leadership_rating');
    table.float('compensation_and_benefits_rating');
    table.float('career_opportunities_rating');
    table.float('work_life_balance_rating');
    table.string('review_job_title');
    table.string('review_job_location');
    table.string('review_headline');
    table.text('pros');
    table.text('cons');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('companies', function(table){
      table.dropColumn('culture_and_values_rating');
      table.dropColumn('senior_leadership_rating');
      table.dropColumn('compensation_and_benefits_rating');
      table.dropColumn('career_opportunities_rating');
      table.dropColumn('work_life_balance_rating');
      table.dropColumn('review_job_title');
      table.dropColumn('review_job_location');
      table.dropColumn('review_headline');
      table.dropColumn('pros');
      table.dropColumn('cons');
    })
};
