module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },

  postMovie: (movie) => {
    return fetch('api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
  },
  patchMovie : (movie, id) => {
    return fetch(`api/movies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
  },
  deleteMovie : (id) => {
    return fetch(`api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  searchMovieAPI: (obj) =>
  {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieDBToken}&query=${obj.title}`, {
      method: "GET",
    }).then(response => response.json()).then(function(data){
      // let genreids = data.results[0].genre_ids;
      // console.log(genreids);
      let posterpath = data.results[0].poster_path;
      let fullposterurl = `https://image.tmdb.org/t/p/w300/${posterpath}`;
      $('#container').append(`<div class="card" id=${obj.id}><div class="card-img-top text-center"><img src="${fullposterurl}"><div class="card-body"><span id="${obj.title}">Title: ${obj.title}</span><br>rated: ${obj.rating}<br><button class="editbutton btn-info">Edit Reel</button><button class="trashbutton btn-danger">Trash Reel</button></div></div></div>`);

      return fullposterurl;

    });

  },
};