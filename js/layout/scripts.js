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
  var monthlyCost = $(this).find('[data-details="cost"]').text();
  
  detailAddDisk.on('click', function() {
    var rowNumber = $('.disk span.count').length;
    rowNumber = rowNumber + 1;
    var $clone = $( ".disk:last" ).clone(true, true)
    $clone.find('input[type=text]').val('Disk ' + rowNumber);
    $clone.find(".count").text(rowNumber);
    $clone.find('[data-details="no-changes"]').text(monthlyCost);
    $clone.find(".icon-rounded.icon-highlighted").attr('data-remove', 'add-disk');
    $clone.insertBefore( ".add-disk" );
    $clone.find('[data-remove="add-disk"]').on("click", function(){
      $(this).parent().parent().remove();
    });
  });

  // Remove disk
  var detailRemoveDisk = $(this).find('[data-remove="add-disk"]');

  detailRemoveDisk.on('click', function() {
      $(this).parent().parent().remove();
  });



  // Add server
  var detailAddServer = $(this).find('[data-details="add-server"]');
  var serverNumber = 1;

    $(function(){
    if (serverNumber ==1 ) {
      $('.delete-clone').hide();
    } else {
      $('.delete-clone').show();
    }
  });

  detailAddServer.on('click', function(e) {
    if (serverNumber == 1) {
      $('.server-name').text('Server 1 Name');
    }
    serverNumber = serverNumber + 1;
    $('.plate').addClass('cloned');
    var $clone = $( ".serverField:first" ).clone(true, true).appendTo( '.plate');
    $clone.find('label').text('Server ' + serverNumber + ' Name');
    $('.delete-clone').show();
    e.preventDefault();
  });

  // Remove Server
  var detailRemoveServer = $(this).find('[data-remove="add-server"]');

  detailRemoveServer.on('click', function() {
    serverNumber = serverNumber - 1;
    if (serverNumber ==1 ) {
      $('.delete-clone').hide();
      $('.plate').removeClass('cloned');
      $('.server-name').text('Server Name');
    }
    $(this).parent().remove();
  });
  
  //generic item deletion
  
  $('[data-remove]').on('click', function(){
     var target = $(this).attr('data-remove');
     $('[data-remove-target="'+target+'"]').remove();
  });


  //Calculate total amount
  var addAmount = $(this).find('[data-details="add-amount"]');
  var value = $(this).find('[data-details="value"]');
  startAmount = 0;
  totalAmount = startAmount;

  addAmount.on('click', function(e) {

    var amount = $(value).closest('[data-details="value"]:first').text();
    var amountInt = parseInt(amount.replace(/[^0-9\.]/g, ''), 10);
    $(this).toggleClass('white');

    if ($(this).hasClass('white')) {
      $(this).val('Remove');
      totalAmount = totalAmount + amountInt;
      $('[data-details="total"]').text('+' + totalAmount + ' USD');
    } else {
      $(this).val('Add');
      totalAmount = totalAmount - amountInt;
      $('[data-details="total"]').text('+' + totalAmount + ' USD');
    }

    if (totalAmount == 0) {
      $('[data-details="btn-continue"]').addClass("secondary");
      $('[data-details="btn-continue"]').val('No thanks, I like to do everything myself');      
    }  else if (totalAmount != 0) {
      $('[data-details="btn-continue"]').removeClass("secondary");
      $('[data-details="btn-continue"]').val('Continue'); 
    }



    e.preventDefault();
  });

});
