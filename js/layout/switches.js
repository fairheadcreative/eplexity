$(function() {

//toggle tabs

  var plateContent = $('[data-plate]');

  //find and show active tab content, hide the rest
  plateContent.each(function(){

      var active = $('.active').attr('data-tab');
      $(this).attr('data-plate') == active? $(this).show() : $(this).hide();

  });

  //toggle active tab
  $('.tabs li:not(.settings)').on( 'click', function(e) {

      e.preventDefault();
      var tabValue = $(this).attr('data-tab'), 
          siblings = $('.tabs li');

      plateContent.each(function(){ 
        $(this).attr('data-plate') == tabValue? $(this).show() : $(this).hide();
      });

      siblings.removeClass('active');
      $(this).addClass('active');

  });

  //toggle product details edit
  var detailsShow = $('[data-details="show"]'),
    detailEdit =  $('[data-details="edit"]').hide(),
    detailClose = $('[data-edit="close"]');

  detailsShow.on('click', function() {
    $(this).hide();
    $(this).siblings(detailEdit).show();
  });

  detailClose.on('click', function() {
    $(this).closest(detailEdit).hide();
    $(this).closest(detailEdit).siblings(detailsShow).show();
  });

  //toggle buttons content
  $('[data-content]').on('click', function(){
    var content = $(this).attr('data-content');
    $(this).replaceWith(content);
  });

  //close button
  $('.action-close').on('click', function(){
    $(this).parent().hide();
  });

});
