'use strict';
$(document).ready(function() {

    var lat = 0;
    var lon = 0;
    var temperatura = 0;

    /*Controllo se presesenta la funzione di geolocalizzazione */
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(consenso, nonConsenso);
    } else
        window.alert('Non è geolocalizzato');

    /*Funzione si attiva se l'utente da il consenso*/
    function consenso(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        estraiDati(lat, lon);
    }

    /*Funzione si attiva se l'utente NON da il consenso*/
    function nonConsenso() {
        window.alert('Non hai dato il permesso per attivare la geolocalizzazione');
    }

    /*Funzione che effettua una chiamata ajax e gestisce la risposta in formato json.*/
    function estraiDati(lat, lon) {
        /*Chiamata ajax verso il server esterno*/
        $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=a9fa46b00d88fcc6181dac9c6db790e6&units=metric',
                type: 'GET',
                dataType: 'json',
            })
            .done(function(risposta) {
                $('main').find('h2').text(risposta.name + ', ' + risposta.sys.country); /*Impostazione nome città e stato*/
                $('main').children('p').text('(' + risposta.coord.lat + ', ' + risposta.coord.lon + ')'); /*Impostazione coordinate geografiche*/
                temperatura = Math.round(risposta.main.temp); /*Estrazione dato relativo alla temperatura ambiente*/
                $('#temp').text(temperatura); /*impostazione della temperatura ambiente*/
                var nomeIcona = risposta.weather[0].icon; /*Estrazione dato relativo al nome dell'icona da utilizzare*/
                $('.flexCol').find('img').attr('src', 'icone/' + nomeIcona + '.svg');

                $('.cella').eq(0).find('span').text((new Date(risposta.dt * 1000)).toLocaleDateString()); /*Millisecondi relativi alla data (da moltiplicare per mille perchè formato file non ben formato)*/
                $('.cella').eq(1).find('span').text(risposta.weather[0].main); /*Impostazione nome tipologia di tempo*/
                $('.cella').eq(2).find('span').text(risposta.wind.speed); /*Impostazione velocità del vento*/
                $('.cella').eq(3).find('span').text(risposta.main.pressure); /*Impostazione della pressione atmosferica*/
                $('.cella').eq(4).find('span').text(risposta.main.humidity); /*Impostazione percentuale di umidità*/
                $('.cella').eq(5).find('span').text((new Date(risposta.sys.sunrise * 1000)).toLocaleTimeString().slice(0, 5)); /*Millisecondi relativi all'alba da aggiustare*/
                $('.cella').eq(6).find('span').text((new Date(risposta.sys.sunset * 1000)).toLocaleTimeString().slice(0, 5)); /*Millisecondi relativi al tramonto da aggiustare*/

                impostaSfondo(nomeIcona); /*Richiamo funzione sfondo dinamico*/
                $('body').show(); /*Chiamata che mostra il contenuto html*/

            })
            .fail(function() {
                window.alert('Errore nella comunicazione con il server');
            })
            .always(function() {
                window.console('conclusa');
            });
    }

    /*Funzione che a seconda del nome dell'icona passato come parametro seleziona l'opportuno sfondo*/
    function impostaSfondo(tempo) {
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
        $('body').css({ 'background': 'url(immagini/' + imgSfondo + '.jpg) no-repeat fixed center', 'backgroundSize': 'cover' });
    }

    /*Gestione dell'evento click del pulsante per la conversione di scala della temperatura*/
    $('#fromXtoY').on('click', function() {
        var scala = $('#scala').text();
        var conversione = temperatura;
        var misura = 'C';
        if (scala == 'C') {
            conversione = ($('#temp').text() * 1.8 + 32).toFixed(1);
            misura = 'F';
            $(this).text('Celsius');
        } else {
            $(this).text('Fahrenheit');
        }
        $('#temp').text(conversione);
        $('#scala').text(misura);
    });
});
