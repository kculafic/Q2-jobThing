(function() {
  'use strict';
  $('.form').click((event) => {
    event.preventDefault();

    const name = $('#companyName').val().trim();

    if (!name) {
      return Materialize.toast('Company name must not be blank', 3000);
    }
;
  const options = {
    contentType: 'application/json',
    data: JSON.stringify({name}),
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
