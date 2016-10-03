$(function() {

//pickup url parameters and apply to parts of a page 
       
    function GetURLParameter(stringParam) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == stringParam) {
          return sParameterName[1];
        }
      }
    };
    
    //pick up and apply server name
    var serverString = GetURLParameter('serverName');
    var serverName = decodeURIComponent(serverString);
    if (typeof serverString != 'undefined') {
        $('.site-title.editable #serverTitle').attr('value', serverName);
      }  
    
    //pick up and apply active tab
    var activeTabString = GetURLParameter('activeTab');
    var activeTab = decodeURIComponent(activeTabString);
    if (typeof activeTabString != 'undefined') {
        $('[data-tab]').removeClass('active');
        $('[data-tab="'+activeTab+'"]').addClass('active');
        $('[data-plate="'+activeTab+'"]').addClass('open');
      }; 
    
    //pick up and apply active sub-tab
    var activeSubTabString = GetURLParameter('activeSubTab');
    var activeSubTab = decodeURIComponent(activeSubTabString);
    if (typeof activeSubTabString != 'undefined') {
        $('.plate-tab.open [data-sub-tab]').removeClass('sub-active');
        $('.plate-tab.open [data-sub-tab="'+activeSubTab+'"]').addClass('sub-active');
      };   
    
    //check if, and apply AWS tab
    var AWSString = GetURLParameter('AWS');
    var AWS = decodeURIComponent(AWSString);
    if (typeof AWSString != 'undefined') {
        $('[data-aws="true"]').show();
        $('[data-aws="false"]').hide();
      }else{
        $('[data-aws="true"]').hide();
        $('[data-aws="false"]').show();
      };
  
//generic turn self off and switch with something else that has same data attribute
  
  $('[data-switch]').on('click', function(){
    var target = $(this).attr('data-switch');
    $('[data-switch-target="'+target+'"]').show();
    $(this).hide();
  });
  
    
//generic toggler
  $('[data-toggle]').on('click', function(){
    var toggleTarget = $(this).attr('data-toggle');
    $('[data-toggle-target="'+toggleTarget+'"]').toggleClass('is-activated');
  });
  

//toggle tabs

  var plateContent = $('[data-plate]'),
      subPlateContent = $('[data-sub-plate]');

  //find and show active tab content, hide the rest
  plateContent.each(function(){

      var active = $('.active').attr('data-tab'),
          plateName = $(this).attr('data-plate');

      plateName == active? $(this).css({'visibility':'visible','position':'relative','left':'0'}) : $(this).css({'visibility':'hidden','position':'fixed','left':'-1000%'});

  });

  //toggle active tab
  var subActiveDesc;
  $('.tabs li:not(.settings)').on( 'click', function(e) {

      e.preventDefault();
      var tabValue = $(this).attr('data-tab'),
          targetValue = $(this).attr('data-target-url'),
          siblings = $('.tabs li');
    
      if(typeof targetValue != 'undefined' && targetValue.match("^/") || typeof targetValue != 'undefined' && targetValue.match("^http")) {
        window.location.href = targetValue;
        return;
      }

      plateContent.each(function(){ 
        $(this).attr('data-plate') == tabValue? $(this).css({'visibility':'visible','position':'relative','left':'0'}).addClass('open') : $(this).css({'visibility':'hidden','position':'fixed','left':'-1000%'}).removeClass('open');
      });

      siblings.removeClass('active');
      $(this).addClass('active');
      $('.sub-tabs li').removeClass('sub-active');
      $('.sub-plate-tab').css({'visibility':'hidden','position':'fixed','left':'-1000%'});
      $('.plate-tab.open .sub-tabs li:nth-child(2)').addClass('sub-active');
      var subActive = $('.sub-active').attr('data-sub-tab'),
          subActiveOpen = $('.plate-tab.open .sub-plate-tab[data-sub-plate="'+subActive+'"]');
      subActiveOpen.css({'visibility':'visible','position':'relative','left':'0'});
      subActiveDesc = $('.sub-active').attr('data-sub-description');
      $('.data-sub-description .sub-target').html(subActiveDesc);

  });
  
//page title input field content toggler
  
  var fieldVal,
      fieldValInitial,
      titleField = $('[data-field="toggle"]');
  
  var fieldValToggler = {
    //get field value into both variables, then empty the field
    getValues:  function() {
                fieldVal = titleField.val();
                fieldValInitial = titleField.val();
                titleField.val('');
    },
    //if here's no input, fill the field with previous value, otherwise fill it with last input value
    passValues: function() {
                fieldVal = titleField.val();
                if(!fieldVal){
                  titleField.val(fieldValInitial);
                }else{
                  titleField.val(fieldVal);
                }   
    }
  };
  
  $('[data-field="toggle"]').on( 'focus', function(){
    fieldValToggler.getValues();
  });
  
  $('[data-field="toggle"]').on( 'blur', function(){
    fieldValToggler.passValues();
  });
  
  //scale down various input fields to fit tex size
  function resizeInput() {
    $(this).attr('size', $(this).val().length);
  }

  titleField.keyup(resizeInput).each(resizeInput);
  $('.unfielded').each(resizeInput);
  
  //show row dropdown
  $('.dropdown-edit').on('click', function(event){
    event.stopPropagation();
    event.preventDefault();
    $(this).find('.edit-toggler').addClass('is-activated');
    if($(this).hasClass('has-options')){
      $(this).parent('.row').addClass('is-highlighted');
      $(this).find('.edit-toggler').removeClass('click-through');
    };
  });
  
  //hide all row dropdowns when cicked outsides, revert everything to originla state
  $('body').bind('click', function(e) {
    if($(e.target).closest('.dropdown-edit').length == 0) {
      $('.edit-toggler').removeClass('is-activated').addClass('click-through');
      $('.row').removeClass('is-highlighted');
    }
  });

  //find and show active sub-tab content, hide the rest
  subPlateContent.each(function() {

      var subActive = $('.sub-active').attr('data-sub-tab');
      $(this).attr('data-sub-plate') == subActive? $(this).css({'visibility':'visible','position':'relative','left':'0'}) : $(this).css({'visibility':'hidden','position':'fixed','left':'-1000%'});

  });

  //toggle active sub-tab
  $('.sub-tabs li:not(.data-sub-description)').on( 'click', function(e) {

      e.preventDefault();
      var subTabValue = $(this).attr('data-sub-tab'),
          targetValue = $(this).attr('data-target-url'), 
          siblings = $('.sub-tabs li');
    
      if(typeof targetValue != 'undefined' && targetValue.match("^/") || typeof targetValue != 'undefined' && targetValue.match("^http")) {
        window.location.href = targetValue;
        return;
      }

      subPlateContent.each(function(){ 
        $(this).attr('data-sub-plate') == subTabValue? $(this).css({'visibility':'visible','position':'relative','left':'0'}) : $(this).css({'visibility':'hidden','position':'fixed','left':'-1000%'});
      });

      siblings.removeClass('sub-active');
      $(this).addClass('sub-active');
      subActiveDesc = $('.sub-active').attr('data-sub-description');
      $('.data-sub-description .sub-target').html(subActiveDesc);

  });

//toggle product details editing (expandables)
  detailsToggler = $('.details-toggler');

  $(detailsToggler).each(function(){

    var detailsShow = $(this).find('[data-details="show"]'),
        detailEdit =  $(this).find('[data-details="edit"]').hide(),
        detailClose = $(this).find('[data-edit="close"]'),
        originalHeight = $(this).outerHeight(),
        detailsOpener = $(this).find('[data-details="open"]');

        //$(this).css('height', originalHeight);

    detailsShow.on('click', function() {
      $(this).hide();
      $(this).siblings(detailEdit).show();
      var thisHeight = $(this).next(detailEdit).outerHeight();
      $(this).closest(detailsToggler).addClass('is-edit').removeClass('is-show');
    });

    detailClose.on('click', function() {
      $(this).closest(detailEdit).hide();
      $(this).closest(detailEdit).siblings(detailsShow).show();
      $(this).closest(detailsToggler).removeClass('is-edit').addClass('is-show');
    });
    
    detailsOpener.on('click', function(){
      detailsShow.hide();
      detailEdit.show();
      $(this).closest(detailsToggler).addClass('is-edit').removeClass('is-show');
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
