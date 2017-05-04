'use strict';
$(document).ready(function() {

    var lat = 45.30; /*latitudine di Lodi*/
    var lon = 9.50; /*longitudine di lodi*/

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
                url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=a9fa46b00d88fcc6181dac9c6db790e6',
                type: 'GET',
                dataType: 'text',
            })
            .done(function(data) {
                window.alert('success');
                var risposta = $.parseJSON(data);
                $('.cella').eq(0).find('span').text(risposta.coord.lat + ', ' + risposta.coord.lon);
                $('.cella').eq(1).find('span').text(risposta.weather[0].main);
                $('.cella').eq(2).find('span').text(risposta.main.temp);
                $('.cella').eq(3).find('span').text(risposta.main.temp_min + ' - ' + risposta.main.temp_max);
                $('.cella').eq(4).find('span').text(risposta.wind.speed);
                $('.cella').eq(5).find('span').text(risposta.main.pressure);
                $('.cella').eq(6).find('span').text(risposta.sys.sunrise);
                $('.cella').eq(7).find('span').text(risposta.sys.sunset);
                $('.cella').eq(8).find('span').text(risposta.main.humidity);
                $('.cella').eq(9).find('span').text(risposta.rain.3h);
            })
            .fail(function() {
                window.alert('error');
            })
            .always(function() {
                window.alert('conclusa');
            });
    });

});
