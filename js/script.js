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


$(document).ready(function(){
    // al click del bottone memorizzo nella variabile ricerca il valore dell'input con id "search"
    $("button").click(function(){
        var ricerca = $("#search").val();
        console.log(ricerca);
        // ad ogni click "svuoto" il mio ul in modo tale che mi cancelli eventuali risultati dati in precedenza
    $("#n").empty();

        $.ajax(
            {
                url: "https://api.themoviedb.org/3/search/movie",
                method: "GET",
                data:{
                    api_key: "edf3f73f0278fbd70155fcad20871afb",
                    language: "it-IT",
                    query: ricerca
                },
                success: function(risposta){
                    // avevo scordato una "i" nelle condizioni del ciclo for e continuava ad andare in loop bloccando la pagina
                    for (var i = 0; i < risposta.results.length; i++){
                        var source = document.getElementById("entry-template").innerHTML;
                        var template = Handlebars.compile(source);


                        var context = {
                            title: risposta.results[i].title,
                            original_title: risposta.results[i].original_title,
                            original_language: risposta.results[i].original_language,
                            vote_average: risposta.results[i].vote_average
                        };
                        var html = template(context);
                        $("#n").append(html);

                    }

                },
                error: function(){
                    alert("Attenzione! Si è verificato un errore");
                }
        })

    });
});
