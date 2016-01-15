$(function() {

  //scroll page to reveal ticket message
  var postBox = $('.ticket-post'),
      postHeight = postBox.outerHeight();
  $("html,body").animate({scrollTop: postBox.offset().top - postHeight}); 

});
