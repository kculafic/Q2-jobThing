$(document).ready(function() {
  'use strict';

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

      const $container = $('.card-container');

      for (let job of jobCollection){

        /* DELETE THESE ONCE JOBCOLLECTION IS UPDATED */
        // job.logo = 'https://media.glassdoor.com/sql/6036/amazon-com-squarelogo-1432805660196.png'
        // job.dateApplied = new Date();
        // job.companyName = 'Bob Inc.';
        /* ^^^^^^^^^^^^^^^^^^^^^ */
        console.log(job);

        const $card = $('<div>').addClass('card horizontal card-panel hoverable col s12 m7 foobarbobwilley');
        const $logowrapper = $('<div>').addClass('card-image center-align valign-wrapper card-panel hoverable');
        const $logoimage = $('<img>').attr('src', job.logo );
        const $jobinfo = $('<div>').addClass('card-stacked card-content');
        const $positiontitle = $('<h4>').text(job.position_title);
        const $companyandlocation = $('<h5>').text(`${job.companyName}, ${job.location}`);
        const $dateapplied = $('<p>').text(job.dateApplied);
        const $companyinfo = $('<div>').addClass('right-align');
        const $moinfo = $('<a>').text('Company Information');

        $logowrapper.append($logoimage);
        $jobinfo.append($positiontitle);
        $jobinfo.append($companyandlocation);
        $jobinfo.append($dateapplied);
        $companyinfo.append($moinfo);
        $jobinfo.append($companyinfo);
        $card.append($logowrapper);
        $card.append($jobinfo);
        $container.prepend($card);
      }

      // iterate over data to build out view
      $('div');

      // DOM stuffs
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });
});
