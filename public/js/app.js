$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  'use strict';

  $('.modal-trigger').leanModal();

  $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });

      window.QUERY_PARAMETERS = {};

      if (window.location.search) {
        window.location.search.substr(1).split('&').forEach((paramStr) => {
          const param = paramStr.split('=');

          window.QUERY_PARAMETERS[param[0]] = param[1];
        });
      }

});
