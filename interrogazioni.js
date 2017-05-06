'use strict';
$(document).ready(function() {

    var lat = 45.30; /*latitudine di Lodi*/
    var lon = 9.50; /*longitudine di lodi*/
    var temperatura = 0;

    /*lat = 63.4667;
    lon = 142.8167;*/
    /*aziona(lat, lon);*/

    /* if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(function(position) {
             lat = position.coords.latitude;
             lon = position.coords.longitude;
             window.alert('Coordinate di Lodi: ' + lat + ', ' + lon);
             /*aziona(lat, lon);
         });
     } else
         window.alert('Non è geolocalizzato');*/


    $('#btn').on('click', function() {
        /*function aziona(lat, lon) {*/
        $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=a9fa46b00d88fcc6181dac9c6db790e6&units=metric',
                type: 'GET',
                dataType: 'json',
            })
            .done(function(risposta) {
                window.alert('success');
                $('main').children('p').text('(' + risposta.coord.lat + ', ' + risposta.coord.lon + ')');
                $('.cella').eq(0).find('span').text((new Date(risposta.dt * 1000)).toLocaleDateString());
                $('.cella').eq(1).find('span').text(risposta.weather[0].main);
                $('#temp').text(Math.round(risposta.main.temp));
                $('.cella').eq(2).find('span').text(risposta.wind.speed);
                $('.cella').eq(3).find('span').text(risposta.main.pressure);
                $('.cella').eq(4).find('span').text(risposta.main.humidity);
                $('.cella').eq(5).find('span').text((new Date(risposta.sys.sunrise * 1000)).toLocaleTimeString().slice(0, 5));
                $('.cella').eq(6).find('span').text((new Date(risposta.sys.sunset * 1000)).toLocaleTimeString().slice(0, 5));
                $('.flexCol').find('img').attr('src', 'icone/' + risposta.weather[0].icon + '.svg');
                $('main').find('h2').text(risposta.name + ', ' + risposta.sys.country);
                impostaSfondo(risposta.weather[0].icon);
                temperatura = Math.round(risposta.main.temp);
            })
            .fail(function() {
                window.alert('error');
            })
            .always(function() {
                window.alert('conclusa');
            });
    });
    /* }*/

    function impostaSfondo(tempo) {
        /*window.alert('Funzione sfondo chiamata da: ' + tempo);*/
        var imgSfondo = '';
        switch (tempo) {
            case '01d':
                imgSfondo = 'sereno';
                break;
            case '01n':
                imgSfondo = 'serenoNotte';
                break;
            case '02d':
            case '02n':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                imgSfondo = 'nuvoloso';
                break;
            case '09d':
            case '09n':
            case '10d':
            case '10n':
                imgSfondo = 'pioggia';
                break;
            case '11d':
            case '11n':
                imgSfondo = 'tuoni';
                break;
            case '13d':
            case '13n':
                imgSfondo = 'neve';
                break;
            case '50d':
            case '50n':
                imgSfondo = 'nebbia';
                break;
            default:
                window.alert('Nessuno sfondo selezionato');
                break;
        }
        $('body').css('backgroundImage', 'url(immagini/' + imgSfondo + '.jpg)');
    }

    $('#fromXtoY').on('click', function() {
        var scala = $('#scala').text();
        var conversione = temperatura;
        var misura = 'C';
        if (scala == 'C') {
            conversione = ($('#temp').text() * 1.8 + 32).toFixed(1);
            misura = 'F';
        }
        $('#temp').text(conversione);
        $('#scala').text(misura);
    });
});
