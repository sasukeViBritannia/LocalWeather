'use strict';
$(document).ready(function() {

    var lat = 45.30; /*latitudine di Lodi*/
    var lon = 9.50; /*longitudine di lodi*/

    /*lat = 43.7;
    lon = -79.42;*/


    /* if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(function(position) {
             lat = position.coords.latitude;
             lon = position.coords.longitude;
             window.alert('Coordinate di Lodi: ' + lat + ', ' + lon);
         });
     } else
         window.alert('Non è geolocalizzato');*/


    $('#btn').on('click', function() {

        $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&APPID=a9fa46b00d88fcc6181dac9c6db790e6&units=metric',
                type: 'GET',
                dataType: 'json',
            })
            .done(function(risposta) {
                window.alert('success');
                $('.cella').eq(0).find('span').text(risposta.city.coord.lat + ', ' + risposta.city.coord.lon);
                $('.cella').eq(1).find('span').text(risposta.list[0].weather[0].main);
                $('.cella').eq(2).find('span').text(Math.round(risposta.list[0].main.temp));
                $('.cella').eq(3).find('span').text(risposta.list[0].wind.speed);
                $('.cella').eq(4).find('span').text(risposta.list[0].main.pressure);
                $('.cella').eq(5).find('span').text(risposta.list[0].main.humidity);
                $('.cella').eq(6).find('span').text(risposta.list[0].rain["3h"]);
            })
            .fail(function() {
                window.alert('error');
            })
            .always(function() {
                window.alert('conclusa');
            });
    });

});
