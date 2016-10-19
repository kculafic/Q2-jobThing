$(document).ready(function() {
  'use strict';

// DISPLAY JOB APPLICATION CARDS
  // connect to companyTable
  // connect to jobApplicationsTable
  // get user_id
  // pull rows (from jobApplicationsTable) according to user_id
  // pull data for the appropriate company (from companyTable)
  // set up card building components
  // take row data (jobApplication data AND company data)
  // ...append each piece into each card
  // loop through cards to sort by editedAt, and to display (stack)

// DISPLAY NEW JOB APPLICATION
  // connect to form
  // pull field parameters from form
  // push parameters into a new card
  // append and display new card

  const options = {
    contentType: 'application/json',
    // data: JSON.stringify({ firstName, lastName, email, password }),
    dataType: 'json',
    type: 'get',
    url: '/jobapplications'
  };

  $.ajax(options)
    .done((jobCollection) => {
      console.log(jobCollection);

      // iterate over data to build out view


      // DOM stuffs
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });
