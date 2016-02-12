$(function() {

//toggle tabs

  var plateContent = $('[data-plate]'),
      subPlateContent = $('[data-sub-plate]');

  //find and show active tab content, hide the rest
  plateContent.each(function(){

      var active = $('.active').attr('data-tab'),
          plateName = $(this).attr('data-plate');

      plateName == active? $(this).css({'visibility':'visible','position':'relative'}) : $(this).css({'visibility':'hidden','position':'fixed'});

  });

  //toggle active tab
  $('.tabs li:not(.settings)').on( 'click', function(e) {

      e.preventDefault();
      var tabValue = $(this).attr('data-tab'), 
          siblings = $('.tabs li');

      plateContent.each(function(){ 
        $(this).attr('data-plate') == tabValue? $(this).css({'visibility':'visible','position':'relative'}).addClass('open') : $(this).css({'visibility':'hidden','position':'fixed'}).removeClass('open');
      });

      siblings.removeClass('active');
      $(this).addClass('active');
      $('.sub-tabs li').removeClass('sub-active');
      $('.sub-plate-tab').css({'visibility':'hidden','position':'fixed'});
      $('.plate-tab.open .sub-tabs li:first-child()').addClass('sub-active');
      var subActive = $('.sub-active').attr('data-sub-tab');
      $('.plate-tab.open .sub-plate-tab[data-sub-plate="'+subActive+'"]').css({'visibility':'visible','position':'relative'});

  });

  //find and show active sub-tab content, hide the rest
  subPlateContent.each(function(){

      var subActive = $('.sub-active').attr('data-sub-tab');
      $(this).attr('data-sub-plate') == subActive? $(this).css({'visibility':'visible','position':'relative'}) : $(this).css({'visibility':'hidden','position':'fixed'});

  });

  //toggle active sub-tab
  $('.sub-tabs li').on( 'click', function(e) {

      e.preventDefault();
      var subTabValue = $(this).attr('data-sub-tab'), 
          siblings = $('.sub-tabs li');

      subPlateContent.each(function(){ 
        $(this).attr('data-sub-plate') == subTabValue? $(this).css({'visibility':'visible','position':'relative'}) : $(this).css({'visibility':'hidden','position':'fixed'});
      });

      siblings.removeClass('sub-active');
      $(this).addClass('sub-active');

  });

//toggle product details editing (expandables)
  detailsToggler = $('.details-toggler');

  $(detailsToggler).each(function(){

    var detailsShow = $(this).find('[data-details="show"]'),
        detailEdit =  $(this).find('[data-details="edit"]').hide(),
        detailClose = $(this).find('[data-edit="close"]'),
        originalHeight = $(this).outerHeight();

        $(this).css('height', originalHeight);

    detailsShow.on('click', function() {
      $(this).hide();
      $(this).siblings(detailEdit).show();
      var thisHeight = $(this).next(detailEdit).outerHeight();
      $(this).closest(detailsToggler).addClass('is-edit').removeClass('is-show').css('height', thisHeight);
    });

    detailClose.on('click', function() {
      $(this).closest(detailEdit).hide();
      $(this).closest(detailEdit).siblings(detailsShow).show();
      $(this).closest(detailsToggler).removeClass('is-edit').addClass('is-show').css('height', originalHeight);
    });
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

  //toggle add/remove actions
  $('[data-action="add"]').on('click', function(){
    $(this).closest('.details-toggler').find('.append-action').html('Added');
  });
  $('[data-action="remove"]').on('click', function(){
    $(this).closest('.details-toggler').find('.append-action').html('<button class="small">Add</button>');
  });

});
