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
                url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=a9fa46b00d88fcc6181dac9c6db790e6&units=metric',
                type: 'GET',
                dataType: 'json',
            })
            .done(function(risposta) {
                window.alert('success');
                $('.cella').eq(0).find('span').text(risposta.coord.lat + ', ' + risposta.coord.lon);
                $('.cella').eq(1).find('span').text((new Date(risposta.dt * 1000)).toLocaleDateString());
                $('.cella').eq(2).find('span').text(risposta.weather[0].main);
                $('.cella').eq(3).find('span').text(Math.round(risposta.main.temp));
                $('.cella').eq(4).find('span').text(risposta.wind.speed);
                $('.cella').eq(5).find('span').text(risposta.main.pressure);
                $('.cella').eq(6).find('span').text(risposta.main.humidity);
                $('.cella').eq(7).find('span').text((new Date(risposta.sys.sunrise * 1000)).toLocaleTimeString().slice(0, 5));
                $('.cella').eq(8).find('span').text((new Date(risposta.sys.sunset * 1000)).toLocaleTimeString().slice(0, 5));
                $('.flexCol').find('img').attr('src', 'http://openweathermap.org/img/w/'+risposta.weather.icon+'.png');
            })
            .fail(function() {
                window.alert('error');
            })
            .always(function() {
                window.alert('conclusa');
            });
    });

});
