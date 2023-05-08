var dict = {};
$(document).ready(function() {
  $('input[type=checkbox]').change(
    function(){
      if (this.checked) {
        dict[this.data-id] = this.data-name;
      }
      else{
        delete dict[this.data-id];
      }
    });
  if (Object.keys(dict).length === 0) {
      $('div.amenities h4').html('&nbsp');
  }
  else{
    $('div.amenities h4').text(Object.values(dict).join(', '));
  }
});
