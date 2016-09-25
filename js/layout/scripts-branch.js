$(function() {
  
   //fetch hihgest support list height and adjust others
    var getHighest = 0;
    $('.equalize').each(function () {
      if ($(this).height() > getHighest) {
        getHighest = $(this).height() + 20;
      }
    });
    if(windowWidth >= 480){
      $('.equalize').css('height', getHighest); 
    };
  
});
