const boolfixApp = new Vue({
  el: ".container",
  data: {
    // per intercettare quanto viene scritto nella text input di ricerca del film
    searchInput: "",
    // array vuoto che conterrà gli oggetti film
    films: [],
    // array vuoto che conterrà gli oggetti tv (serie tv)
    tvs: [],
    //
    genere: "",
  },
  methods: {
    // funzione di ricerca dei film e delle serie tv
    search: function() {
      // chiamata per i film
      axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          // è la mia key personale
          api_key: "05217f3cdcc2596018b7243eabea0d2d",
          // quello che viene scritto nella text input di ricerca del film diventa la query, che è proprio la parte, da quanto si evince dalla documentazione, di filtraggio
          query: this.searchInput
        }
      }).then( film => this.films = film.data.results);
      // chiamata per le serie tv
      axios.get("https://api.themoviedb.org/3/search/tv", {
        params: {
          // è la mia key personale
          api_key: "05217f3cdcc2596018b7243eabea0d2d",
          // quello che viene scritto nella text input di ricerca del film diventa la query, che è proprio la parte, da quanto si evince dalla documentazione, di filtraggio
          query: this.searchInput,
        }
      }).then( tv => this.tvs = tv.data.results);
      if (this.searchInput == "") {
        this.films = [];
        this.tvs = [];
      }
    },
    // funzione che prende il parametro vote_average di ogni film o serie tv e lo restituisce diviso 2 e intero, arrotondato per eccesso
    voteAverageFunction: function(filmOrTv) {
      let voteAverageModified = Math.ceil(filmOrTv.vote_average / 2);
      return voteAverageModified;
    },
    // funzione che gestisce un'eccezione; l'eccezione consiste nel fatto che l'immagine relativa alla original_language non viene trovata; in tal caso viene mostrata un'immagine "anonima"
    flagImgIsNotFound: function(flag) {
      flag.target.src = "img/flag.jpg"
    },
    // funzione che gestisce un'eccezione; l'eccezione consiste nel fatto che l'immagine relativa alla poster_path non viene trovata; in tal caso viene mostrata un'immagine "anonima"
    backdropImgIsNotFound: function(backdrop) {
      backdrop.target.src = "img/backdrop.jpg"
    }
  }
});
