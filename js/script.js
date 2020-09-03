// milestone 1:
// Creare un layout base con una searchbar (una input e un button)
// in cui possiamo scrivere completamente o parzialmente
// il nome di un film. Possiamo, cliccando il bottone,
// cercare sull’API tutti i film che contengono
// ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API
// visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

// milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5,
//  così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
//   lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente,
//  gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API
//   (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv.
// Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query,
//  sia le serie tv, stando attenti ad avere alla fine dei valori simili
//  (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)


$(document).ready(function(){
    // al click del bottone memorizzo nella variabile ricerca il valore dell'input con id "search"
    $("button").click(function(){
        var ricerca = $("#search").val();
        console.log(ricerca);
        ricercaFilm(ricerca);
        // ad ogni click "svuoto" il mio ul in modo tale che mi cancelli eventuali risultati dati in precedenza
    $("#n").empty();

    });



// FUNZIONI
// funzione di chiamata all'API e ricerca film
function ricercaFilm(query){
            $.ajax(
                {
                    url: "https://api.themoviedb.org/3/search/movie",
                    method: "GET",
                    data:{
                        api_key: "edf3f73f0278fbd70155fcad20871afb",
                        language: "it-IT",
                        query: query
                    },
                    success: function(risposta){
                        if(risposta.total_results > 0){
                            // se la chiamata dell'API restituisce uno o più risultato allora richiamo la funzione film() altrimenti la funzione nessunRisultato
                            film(risposta.results);
                        } else {
                            nessunRisultato();
                        }

                    },
                    error: function(){
                        alert("Attenzione! Si è verificato un errore");
                    }
            })
        }

// FUNZIONE NESSUN RISULTATO trovato

    function nessunRisultato(){
        alert("Nessun risultato trovato");
    }

    function film(data){
        for (var i = 0; i < data.length; i++){
            var source = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
            var context = {
                title: data[i].title,
                original_title: data[i].original_title,
                original_language: bandiera(data[i].original_language),
                vote_average: rate(data[i].vote_average),
            };
            var html = template(context);
            $("#n").append(html);

        }
    }

    // creo una funzione per trasformare il voto da 1 a 10 decimale in voto da 1 a 5 interno
    function rate(numero){
        var divisione = numero / 2; //divido per due il Voto
        // arrotondo il voto diviso per due
        var nArrotondato = Math.ceil(divisione);
        var star = " ";
        // ciclo for per la creazione di 5 stelle
        for (var i = 1; i<6; i++){
            if(i <= nArrotondato){
                // aggiungo la classe "stella" alle prime n stelle
                star += '<i class="fas fa-star stella"></i>';
            } else {
                star += '<i class="fas fa-star"></i>';
            };
        };
        return star;
    };

    function bandiera(flag){
        var band = "";
        if (flag == "it"){
            band += '<img class="bandiere" src="img/it.svg" alt="ita">';
        } else if (flag == "en"){
            band += '<img class="bandiere" src="img/en.svg" alt="eng">';
        } else {
            band = flag;
        };
        return band;
    };




});
