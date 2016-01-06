$(function() {

//toggle tabs
  //find and show active tab content, hide the rest
  $("[data-plate]").each(function(){
       $(this).hide();
       var active = $('.active').attr('data-tab');
      if($(this).attr('data-plate') == active ) {
          $(this).show();
      }
  });

  //toggle active tab
  $('.tabs li').on( "click", function(e) {
      e.preventDefault();
      var tabValue = $(this).attr('data-tab'); 
      var siblings = $('.tabs li');
      $("[data-plate]").each(function(){
          $(this).hide();
          if($(this).attr('data-plate') == tabValue) {
              $(this).show();
          }
      });
      siblings.removeClass('active');
      $(this).addClass('active');
  });

});
