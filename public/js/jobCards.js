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

      let count = 1;
      for (let job of jobCollection){

        /* DELETE THESE ONCE JOBCOLLECTION IS UPDATED */
        // job.logo = 'https://media.glassdoor.com/sql/6036/amazon-com-squarelogo-1432805660196.png'
        // job.dateApplied = new Date();
        // job.jobName = 'Bob Inc.';
        /* ^^^^^^^^^^^^^^^^^^^^^ */


        /* ------------------------ Job Card ------------------------ */
        const $card = $('<div>').addClass('card horizontal card-panel hoverable col s12 m7');
        const $logowrapper = $('<div>').addClass('card-image center-align valign-wrapper card-panel hoverable');
        const $logoimage = $('<img>').attr('src', job.logo );
        const $jobinfo = $('<div>').addClass('card-stacked card-content');
        const $positiontitle = $('<h4>').text(job.position_title);
        const $companyandlocation = $('<h5>').text(`${job.company_name}, ${job.location}`);
        const $dateapplied = $('<p>').text(job.date_applied);
        const $jobId = $('<p>').addClass('jobApplicationId').text(`[Job # ${job.id} ]`);

        const $buttonWrapper = $('<div>')
const $buttonCompanyInfo = $('<a>').addClass('waves-effect waves-light btn modal-trigger left-align').attr('href', `#job${count}`).text('Company Information');
        const $buttonEdit = $('<a>').addClass('editApplication waves-effect waves-light btn center-align-align').text('Edit');
        const $buttonDelete = $('<a>').addClass('deleteApplication waves-effect waves-light btn center-align-align').text('Delete');

        $logowrapper.append($logoimage);
        $jobinfo.append($positiontitle);
        $jobinfo.append($companyandlocation);
        $jobinfo.append($dateapplied);
        $jobinfo.append($jobId);

        $buttonWrapper.append($buttonCompanyInfo);
        $buttonWrapper.append($buttonEdit);
        $buttonWrapper.append($buttonDelete);

        $card.append($logowrapper);
        $card.append($jobinfo);
        $card.append($buttonWrapper);


        /* ------------------------ +++++++++++++ ------------------------ */
        /* ------------------------ Company Modal ------------------------ */
        /* ------------------------ +++++++++++++ ------------------------ */

const $modalcontainer = $('<div>').addClass('modal').attr('id', `job${count}`);
        const $modalContent = $('<div>').addClass('modal-content');
        const $modalThirdContent = $('<div>').addClass('col s12 m7');

        /* ------------------------ Company Header ------------------------ */

        const $cHeader = $('<div>').addClass('card horizontal card-panel hoverable');
        const $cHeaderLogo = $('<div>').addClass('card-image center-align valign-wrapper card-panel hoverable');
        const $cHeaderLogoImage = $('<img>').attr('src', job.logo );

        const $cHeaderDiv = $('<div>').addClass('card-stacked');
        const $cHeaderSubDiv = $('<div>').addClass('card-content left-align');
        const $cHeaderCompanyName = $('<h3>').text(job.company_name);
        const $cHeaderCompanyWebsite = $('<a>').attr('href', job.website );
        const $cHeaderIndustry = $('<p>').text(job.industry);

        $cHeaderLogo.append($cHeaderLogoImage);
        $cHeader.append($cHeaderLogo);

        $cHeaderSubDiv.append($cHeaderCompanyName);
        $cHeaderSubDiv.append($cHeaderCompanyWebsite);
        $cHeaderSubDiv.append($cHeaderIndustry);
        $cHeaderDiv.append($cHeaderSubDiv);
        $cHeader.append($cHeaderDiv);

        $modalThirdContent.append($cHeader);

        /* ------------------------ Company Ratings ------------------------ */

        const $cRating = $('<div>').addClass('card horizontal card-panel hoverable');
        const $cRatingStacked = $('<div>').addClass('card-stacked');
        const $cRatingContent = $('<div>').addClass('card-content left-align');

        const $ratings = $('<h4>').text('Ratings');
        const $cultureAndValues = $('<p>').text(`Culture and Values: ${job.culture_and_values_rating}`);
        const $seniorLeadership = $('<p>').text(`Senior Leadership: ${job.senior_leadership_rating}`);
        const $compensationAndBenefits = $('<p>').text(`Compensation and Benefits: ${job.compensation_and_benefits_rating}`);
        const $careerOpportunities = $('<p>').text(`Career Opportunities: ${job.career_opportunities_rating}`);
        const $workLifeBalance = $('<p>').text(`Work Life Balance: ${job.work_life_balance_rating}`);
        const $overallRating = $('<p>').text(`Culture and Values: ${job.overall_rating}`);

        $cRatingContent.append($ratings);
        $cRatingContent.append($cultureAndValues);
        $cRatingContent.append($seniorLeadership);
        $cRatingContent.append($compensationAndBenefits);
        $cRatingContent.append($careerOpportunities);
        $cRatingContent.append($workLifeBalance);
        $cRatingContent.append($overallRating);

        $cRatingStacked.append($cRatingContent);
        $cRating.append($cRatingStacked);

        $modalThirdContent.append($cRating);

        /* -------------------- Company Featured Review -------------------- */

        const $cFeatRev = $('<div>').addClass('card horizontal card-panel hoverable');
        const $cFeatRevStacked = $('<div>').addClass('card horizontal card-panel hoverable');
        const $cFeatRevContent = $('<div>').addClass('card-content left-align');

        const $review = $('<h4>').text('Featured Review');
        const $reviewedJobTitleAndLocation = $('<h5>').text(`${job.review_job_title}, ${job.review_job_location}`);

        const $cFeatRevContentHeadline = $('<div>').addClass('card-content left-align');
        const $reviewedHeadline = $('<h5>').text(`${job.review_headline}`);
        const $pros = $('<p>').text('Pros: ');
        const $prosReview = $('<p>').text(`${job.pros}`);
        const $breakline = $('<br />');
        const $cons = $('<p>').text('Cons: ');
        const $consReview = $('<p>').text(`${job.cons}`);

        $cFeatRevContentHeadline.append($reviewedHeadline);
        $cFeatRevContentHeadline.append($pros);
        $cFeatRevContentHeadline.append($prosReview);
        $cFeatRevContentHeadline.append($breakline);
        $cFeatRevContentHeadline.append($cons);
        $cFeatRevContentHeadline.append($consReview);

        $cFeatRevContent.append($reviewedJobTitleAndLocation);
        $cFeatRevContent.append($review);
        $cFeatRevContent.append($cFeatRevContentHeadline);

        $cFeatRevStacked.append($cFeatRevContent);
        $cFeatRev.append($cFeatRevStacked);

        $modalThirdContent.append($cFeatRev);

        /* -------------------- Footer -------------------- */

        const $exitButton = $('<a>').attr('href', '#!' ).addClass('modal-action modal-close waves-effect waves-green btn-flat').text('Exit');
        const $footer = $('<div>').addClass('`modal-footer`');

        $footer.append($exitButton);

        $modalContent.append($footer);

        /* -------------------- ******** -------------------- */
        $modalContent.append($modalThirdContent);
        $modalcontainer.append($modalContent);

$('body').append($modalcontainer);


        $container.prepend($card);

        count++;
      }
      $('.modal-trigger').leanModal();

    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });
});
