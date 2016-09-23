$(function() {
  
  //generic go to url for when you can't use links
  $('[data-url]').on('click', function(){
    var location = $(this).attr('data-url');
    window.location.href = location;
  });
  
  
  
  if ($('body.pars-uri').length > 0)
    {
      //document.URL == "http://helloworld.com/quotes?id=1337&author=kelvin&message=hello"
      var currentURL = document.URL;
      var params = currentURL.extract();
      var serverName = decodeURIComponent(params.serverName);
      //console.log(serverName); // 1337
      //console.log(params.author) // "kelvin"
      //console.log(params.message) // "hello"
      $('.site-title.editable #serverTitle').attr('value', serverName);
    };

});
