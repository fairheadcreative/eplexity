$(function() {

  //send value to hidden checkboxes
  $('[data-value]').on('click', function(){
    var value = $(this).attr('data-value');
    $('[data-toppings="' + value + '"]').prop('checked', true);
  });

  //increment/decrement number of slices and pass value
  var slicesNumber = ['One','Two','Three','Four','Five'],
      i = 0,
      arrayLength = slicesNumber.length;
    $('.button.increment').on('click', function(){
      i = (i+1) % arrayLength;
      $('.item-count').html(slicesNumber[i]);
      $('[name="quantity"]').attr('value', i+1);
      var item = $('.item-type');
      if(i>0){
        item.addClass('plural');
      }else{item.removeClass('plural');};
    });  
    $('.button.decrement').on('click', function(){
      i = (i-1) % arrayLength;
      if(i < 0){i=arrayLength-1};
      $('.item-count').html(slicesNumber[i]);
      $('[name="quantity"]').attr('value', i+1);
      var item = $('.item-type');
      if(i>0){
        item.addClass('plural');
      }else{item.removeClass('plural');};
    }); 

  //remove input placeholders on focus  
  $('[placeholder]').each(function() {
    $(this).on('click', function(){
     var atri = $(this).attr('placeholder');
        $(this).attr('placeholder', '');
        $(this).focusout(function(){
        $(this).attr('placeholder', atri);
        });
    });
  });

});
