'use strict';
$(document).ready(function() {

    var lat = 45; /*latitudine di Lodi*/
    var lon = 9; /*longitudine di lodi*/

    /* if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(function(position) {
             lat = Math.round(position.coords.latitude);
             lon = Math.round(position.coords.longitude);
             window.alert('Coordinate di Lodi: ' + lat + ', ' + lon);
         }
     } else
         window.alert('Non è geolocalizzato');*/


    /* $('#btn').on('click', function() {

         $.ajax({
                 url: 'api.openweathermap.org/data/2.5/weather?lat=45&lon=9',
                 type: 'GET',
                 dataType: 'json',
                 data: ''
             })
             .done(function() {
                 window.alert("success");
             })
             .fail(function() {
                 window.alert("error");
             });
     });*/

});
