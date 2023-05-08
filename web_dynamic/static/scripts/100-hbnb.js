var amendict = {};
var statedict = {};
var citydict = {};
$(document).ready(function() {
  $('.amenities input[type=checkbox]').change(
    function(){
      if ((this).prop('checked')) {
        amendict[$(this).attr('data-id')] = $(this).attr('data-name');
      }
      else{
        delete amendict[$(this).attr('data-id')]
      }
      if (Object.keys(amendict).length === 0) {
        $('div.amenities h4').html('&nbsp');
      }
      else{
        $('div.amenities h4').text(Object.values(amendict).join(', '));
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
      data: JSON.stringify({
        amenities: Object.keys(amendict),
        state: Object.keys(statedict),
        cities: Object.keys(citydict),
      }),
      contentType: "application/json",
      success: function (data) {
      }
    });
  });
  $('.stateBox input[type=checkbox]').change(
    function(){
      if ((this).prop('checked')) {
        statedict[$(this).attr('data-id')] = $(this).attr('data-name');
      }
      else{
        delete statedict[$(this).attr('data-id')]
      }
      if (Object.keys(statedict).length === 0 && Object.keys(citydict).length == 0) {
        $('locations h4').html('&nbsp');
      }
      else{
        $('.locations h4').text(Object.values(statedict).concat(Object.values(citydict)).join(', '));
      }
    });
  $('.citybox input[type=checkbox]').change(
    function(){
      if ((this).prop('checked')) {
        citydict[$(this).attr('data-id')] = $(this).attr('data-name');
      }
      else{
        delete citydict[$(this).attr('data-id')]
      }
      if (Object.keys(citydict).length === 0 && Object.keys(statedict).length == 0) {
        $('locations h4').html('&nbsp');
      }
      else{
        $('.locations h4').text(Object.values(citydict).concat(Object.values(statedict)).join(', '));
      }
    });
});
