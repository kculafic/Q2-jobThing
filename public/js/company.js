(function() {
  'use strict';
  $('.form').click((event) => {
    event.preventDefault();

    const companyName = $('#companyName').val().trim();
    const location = $('#location').val().trim();
    const url = $('#urlposting').val().trim();
    const position = $('#position').val().trim();
    const date = $('#date').val().trim();

    if (!companyName) {
      return Materialize.toast('Company name must not be blank', 3000);
    }

    const options = {
      contentType: 'application/json',

      data: JSON.stringify({ companyName, position, location, url, date }),
      dataType: 'json',
      type: 'POST',
      url: '/jobApplications '
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/user.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
})();
