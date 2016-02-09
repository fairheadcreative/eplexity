$(function() {

//toggle tabs

  var plateContent = $('[data-plate]'),
      subPlateContent = $('[data-sub-plate]');

  //find and show active tab content, hide the rest
  plateContent.each(function(){

      var active = $('.active').attr('data-tab');
      $(this).attr('data-plate') == active? $(this).show() : $(this).hide();

  });

  //toggle active tab
  $('.tabs li:not(.settings)').on( 'click', function(e) {

      e.preventDefault();
      var tabValue = $(this).attr('data-tab'), 
          siblings = $('.tabs li')
          subs = $('.' + tabValue + ' .sub-tabs li');

      plateContent.each(function(){ 
        $(this).attr('data-plate') == tabValue? $(this).show() : $(this).hide();
      });

      siblings.removeClass('active');
      $(this).addClass('active');

  });

  //find and show active sub-tab content, hide the rest
  subPlateContent.each(function(){

      var subActive = $('.sub-active').attr('data-sub-tab');
      $(this).attr('data-sub-plate') == subActive? $(this).show() : $(this).hide();

  });

  //toggle active sub-tab
  $('.sub-tabs li').on( 'click', function(e) {

      e.preventDefault();
      var subTabValue = $(this).attr('data-sub-tab'), 
          siblings = $('.sub-tabs li');

      subPlateContent.each(function(){ 
        $(this).attr('data-sub-plate') == subTabValue? $(this).show() : $(this).hide();
      });

      siblings.removeClass('sub-active');
      $(this).addClass('sub-active');

  });

  //toggle product details edit
  var detailsShow = $('[data-details="show"]'),
    detailEdit =  $('[data-details="edit"]').hide(),
    detailClose = $('[data-edit="close"]');

  detailsShow.on('click', function() {
    $(this).hide();
    $(this).siblings(detailEdit).show();
    $(this).parent().addClass('is-edit').removeClass('is-show');
  });

  detailClose.on('click', function() {
    $(this).closest(detailEdit).hide();
    $(this).closest(detailEdit).siblings(detailsShow).show();
    $(this).parent().parent().parent().removeClass('is-edit').addClass('is-show');
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
