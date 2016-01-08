$(function() {

  //send value to hidden checkboxes
  $('[data-value]').on('click', function(){
    var value = $(this).attr('data-value');
    $('[data-toppings="' + value + '"]').prop('checked', true);
  });

  //increment/decrement number of slices and pass value
  var slicesNumber = ['one slice','two slices','three slices','four slices','five slices'],
      i = 0,
      arrayLength = slicesNumber.length;
    $('.button.increment').on('click', function(){
      i = (i+1) % arrayLength;
      $('.slice-count').html(slicesNumber[i]);
      $('[name="quantity"]').attr('value', i+1);
    });  
    $('.button.decrement').on('click', function(){
      i = (i-1) % arrayLength;
      if(i < 0){i=arrayLength-1};
      $('.slice-count').html(slicesNumber[i]);
      $('[name="quantity"]').attr('value', i+1);
    });   

});
