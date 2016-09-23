$(function() {
  
  //generic go to url for when you can't use links
  $('[data-url]').on('click', function(){
    var location = $(this).attr('data-url');
    window.location.href = location;
  });

//pickup url parameters and apply to parts of a page  
  if ($('body.pars-uri').length) {
       
    function GetURLParameter(stringParam) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == stringParam) {
          return sParameterName[1];
        }
      }
    }
    
    //pick up and apply server name
    var serverString = GetURLParameter('serverName');
    var serverName = decodeURIComponent(serverString);
    if (typeof serverString != 'undefined') {
        $('.site-title.editable #serverTitle').attr('value', serverName);
      }    
    
    };
  
});
