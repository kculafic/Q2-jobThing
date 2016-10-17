
  $('.form').click((event) => {
    event.preventDefault();

    const company = $('#company').val().trim();

    if (!company) {
      return Materialize.toast('company must not be blank', 3000);
    }

    rp(`api.glassdoor.com/api/api.htm?t.p=100491&t.k=fViN5CriXem&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&q=${company}`)
      .then(function (companies) {
        console.log(companies);
      });
  });
