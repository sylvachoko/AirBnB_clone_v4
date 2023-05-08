var dict = {};
$(document).ready(function() {
  $('input[type=checkbox]').change(
    function(){
      if ((this).prop('checked')) {
        dict[$(this).attr('data-id')] = $(this).attr('data-name');
      }
      else{
        delete dict[$(this).attr('data-id')]
      }
      if (Object.keys(dict).length === 0) {
        $('div.amenities h4').html('&nbsp');
      }
      else{
        $('div.amenities h4').text(Object.values(dict).join(', '));
      }
    });
  $.get("http://0.0.0.0:5001/api/v1/places_search/", function(data, status){
    if(xhr.status==200){
      $('div#api_status').addClass('available');
    }
    else{
      $('div#api_status').removeClass('available')
    }
  });
  $.ajax ({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contentType: "application/json",
    success: function (data) {
      for (cost place in data){
        const template = `<article>
        <div class="title_box">
          <h2>{{ place.name }}</h2>
          <div class="price_by_night">${{ place.price_by_night }}</div>
        </div>
        <div class="information">
          <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
          <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
          <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
        </div>
        <div class="user">
          <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
        </div>
        <div class="description">
          {{ place.description | safe }}
        </div>
        </article>`;
        $('section.places').append(template);
      }
    }
  });
  $("button").click(function(){
    $.ajax ({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({amenities: Object.keys(dict)}),
      contentType: "application/json",
      success: function (data) {
      }
    });
  });
});
