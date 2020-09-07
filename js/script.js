$(document).ready(function(){
    // al click del bottone memorizzo nella variabile ricerca il valore dell'input con id "search"
    $("button").click(function(){
        var ricerca = $("#search").val();
        console.log(ricerca);
        ricercaFilm(ricerca);
        ricercaSerieTv(ricerca);
        // ad ogni click "svuoto" il mio ul in modo tale che mi cancelli eventuali risultati dati in precedenza
    $("#n").empty();
    $(".j").empty();

    });

    //premendo il tasto invio memorizzio faccio in modo che vengano richiamate le funzioni per la ricerca dei film o serie TV
    $('input').keyup(function(e){
        if(e.keyCode == 13){
            var ricerca = $("#search").val();
            ricercaFilm(ricerca);
            ricercaSerieTv(ricerca);
        };

        $("#n").empty();
        $(".j").empty();
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
                            nessunRisultatoFilm();
                        }

                    },
                    error: function(){
                        alert("Attenzione! Si è verificato un errore");
                    }
            })
        }

function ricercaSerieTv(query){
            $.ajax(
                    {
                        url: "https://api.themoviedb.org/3/search/tv",
                        method: "GET",
                        data:{
                            api_key: "edf3f73f0278fbd70155fcad20871afb",
                            language: "it-IT",
                            query: query
                        },
                        success: function(risposta){
                            if(risposta.total_results > 0){
                                // se la chiamata dell'API restituisce uno o più risultato allora richiamo la funzione film() altrimenti la funzione nessunRisultato
                                serieTv(risposta.results);
                            } else {
                                nessunRisultatoSerieTv();
                            }

                        },
                        error: function(){
                            alert("Attenzione! Si è verificato un errore");
                        }
                })
            };

// FUNZIONE NESSUN RISULTATO trovato

    function nessunRisultatoFilm(){
        $("p.j").append("Non è stato trovato nessun film con questo nome")
    };

// FUNZIONE FILM
    function film(data){
        for (var i = 0; i < data.length; i++){
            var source = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
            var context = {
                title: data[i].title,
                original_title: data[i].original_title,
                overview: data[i].overview.substring(0, 150),
                original_language: bandiera(data[i].original_language),
                vote_average: rate(data[i].vote_average),
                poster_path: data[i].poster_path
            };
            var html = template(context);
            $("#n").append(html);

        }
    };


// FUNZIONE SERIE TV
function serieTv(data){
    for (var i = 0; i < data.length; i++){
        var source = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var context = {
            title: data[i].name,
            original_tirle: data[i].original_name,
            overview: data[i].overview.substring(0, 150),
            original_language: bandiera(data[i].original_language),
            vote_average: rate(data[i].vote_average),
            poster_path: data[i].poster_path,
        };
        var html = template(context);
        $("#n").append(html);

    }
};

function nessunRisultatoSerieTv(){
    $("p.j").append("Non è stata trovata nessuna serie TV con questo nome")
};

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
            band += '<img class="bandiere" src="img/it.png" alt="ita">';
        } else if (flag == "en"){
            band += '<img src="img/en.png" alt="eng">';
        } else {
            band = flag;
        };
        return band;
    };

});
