$(function() {
  
  var windowWidth = $(window).width();  
  
  //generic go to url for when you can't use links
  $('[data-url]').on('click', function(){
    var location = $(this).attr('data-url');
    window.location.href = location;
  });
  

   //fetch hihgest support list height and adjust others
    var getHighest = 0;
    $('.equalize').each(function () {
      if ($(this).height() > getHighest) {
        getHighest = $(this).height();
      }
    });
    if(windowWidth >= 480){
      $('.equalize').css('height', getHighest); 
    };

  // Add disk
  var detailAddDisk = $(this).find('[data-details="add-disk"]');
  
  detailAddDisk.on('click', function() {
    var rowNumber = $('.disk span.count').length;
    rowNumber = rowNumber + 1;
    var $clone = $( ".disk:last" ).clone(true, true)
    $clone.find('input').val('Disk ' + rowNumber);
    $clone.find(".count").text(rowNumber);
    $clone.insertBefore( ".add-disk" );
  });

  // Delete current disk
  $(".span1").click(function () {
    $(this).parent().remove();
  });
  
});
