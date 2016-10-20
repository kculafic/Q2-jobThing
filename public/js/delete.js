(function() {
$('.deleteApplication').click((event) => {
  event.preventDefault();

  const jobApplicationsId= $('.jobApplicationsId').val().trim();




  const options = {
    data: JSON.stringify({jobApplicationsId}),
    dataType: 'json',
    type: 'DELETE',
    url: '/jobapplications'
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
