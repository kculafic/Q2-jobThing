(function() {
  'use strict';


    const jobId = window.QUERY_PARAMETERS.id;
    console.log(jobId);
  // if (!jobId) {
  //   window.location.href = '/user.html';
  // }

  const renderBook = function(job) {
    $('#notes').val(job.notes);
    $('#interview').val(job.interview);
    $('#cancel').attr('href', `/edit.html?id=${job.id}`);

    Materialize.updateTextFields();
  };

  const attachListeners = function(book) {
    // eslint-disable-next-line max-statements
    $('#editNotes').submit((event) => {
      event.preventDefault();

      const notes = $('#notes').val().trim();
      const interview = $('#interview').val().trim();


      if (!notes) {
        return Materialize.toast('Notes must not be blank', 3000);
      }

      if (!interview) {
        return Materialize.toast('Interview must not be blank', 3000);
      }


      const options = {
        contentType: 'application/json',
        data: JSON.stringify({ notes, interview}),
        dataType: 'json',
        type: 'PATCH',
        url: `/jobApplications/${jobId}`
      };

      $.ajax(options)
        .done(() => {
          window.location.href = `/edit.html?id=${jobId}`;
        })
        .fail(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
    });
  };

  $.getJSON(`/jobApplications/${jobId}`)
    .done((book) => {
      renderBook(book);
      attachListeners(book);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve app', 3000);
    });
})();
