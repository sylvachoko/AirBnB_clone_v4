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
  $.get("http://0.0.0.0:5001/api/v1/status/", function(data, status){
    if(xhr.status==200){
      $('div#api_status').addClass('available');
    }
    else{
       $('div#api_status').removeClass('available')
    }
  });
});
