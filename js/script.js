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

        $.ajax(
            {
                url: "https://api.themoviedb.org/3/search/movie",
                method: "GET",
                data:{
                    api_key: "edf3f73f0278fbd70155fcad20871afb",
                    language: "it-IT",
                    query: ricerca,
                },
                success: function(risposta){
                    for (var i = 0; risposta.results.length; i++){

                    }
                },
                error: function(){
                    alert("Attenzione! Si è verificato un errore");
                }
        })

    });
});
