'use strict';
$(document).ready(function() {

    var lat = 0; /*latitudine di Lodi*/
    var lon = 0; /*longitudine di lodi*/

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = Math.round(position.coords.latitude);
            lon = Math.round(position.coords.longitude);
            window.alert('Coordinate di Lodi: ' + lat + ', ' + lon);
        });
    } else
        window.alert('Non è geolocalizzato');


     $('#btn').on('click', function() {

         $.ajax({
                 url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=a9fa46b00d88fcc6181dac9c6db790e6',
                 type: 'GET',
                 dataType: 'json',
             })
             .done(function() {
                 window.alert('success');
             })
             .fail(function() {
                 window.alert('error');
             })
             .always(function(){
             	window.alert('conclusa');
             });
     });

});
