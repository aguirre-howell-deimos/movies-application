/**
 * es6 modules and imports
 */
/**
 * require style imports
 */
const {getMovies, postMovie, patchMovie, deleteMovie, movieDBToken, searchMovieAPI} = require('./api.js');
const $ = require("jquery");


//
// const genres = [
//   {
//     "id": 28,
//     "name": "Action"
//   },
//   {
//     "id": 12,
//     "name": "Adventure"
//   },
//   {
//     "id": 16,
//     "name": "Animation"
//   },
//   {
//     "id": 35,
//     "name": "Comedy"
//   },
//   {
//     "id": 80,
//     "name": "Crime"
//   },
//   {
//     "id": 99,
//     "name": "Documentary"
//   },
//   {
//     "id": 18,
//     "name": "Drama"
//   },
//   {
//     "id": 10751,
//     "name": "Family"
//   },
//   {
//     "id": 14,
//     "name": "Fantasy"
//   },
//   {
//     "id": 36,
//     "name": "History"
//   },
//   {
//     "id": 27,
//     "name": "Horror"
//   },
//   {
//     "id": 10402,
//     "name": "Music"
//   },
//   {
//     "id": 9648,
//     "name": "Mystery"
//   },
//   {
//     "id": 10749,
//     "name": "Romance"
//   },
//   {
//     "id": 878,
//     "name": "Science Fiction"
//   },
//   {
//     "id": 10770,
//     "name": "TV Movie"
//   },
//   {
//     "id": 53,
//     "name": "Thriller"
//   },
//   {
//     "id": 10752,
//     "name": "War"
//   },
//   {
//     "id": 37,
//     "name": "Western"
//   }];

getMovies()
.then((movies) => {
  movies.forEach(({title, rating, id}) => {
    let movieobj = {title, rating, id};
    searchMovieAPI(movieobj)
  })
})
.catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

$(window).on("load", function(){
  let movie = {};
  $(".loader").fadeOut(1200);

  $("#buttonadd").click(function(e){
    (e).preventDefault();
  //  Getting values and saving them to post
  movie.title = $("#movietitle").val();
  movie.rating = $("#movierating").val();
       //Ability to post movies dynamically
       postMovie(movie);
       getMovies().then((movies) => {
         $("#container").empty();
         movies.forEach(({title, rating, id}) => {
           let movieobj = {title, rating, id};
           searchMovieAPI(movieobj)
         });
       });
    });
  });
//  Updating the edit modal dynamically

  $(document).ready(function() {
    $('body').on('click', '.editbutton', function () {
      let buttonclicked = $(this);
      let movietitle = buttonclicked.parent().find("span").attr("id");
      $("#edit-text").val(movietitle);
      $(".modal-title").text(movietitle);
      let divid = buttonclicked.parent().parent().parent().attr("id");
      $("#hideid").text(divid);
    });

    $("#ratingchange").click(function (e) {
      let dbid = $("#hideid").text();
      let newtitle = $("#edit-text").val();
      let newrating = $("#editmovierating").val();
      console.log(dbid);
      let movie = {
        "title": newtitle,
        "rating": newrating
      };
      patchMovie(movie, dbid);
      $("#container").empty();

      getMovies().then((movies) => {
        $("#container").empty();
        movies.forEach(({title, rating, id}) => {
          let movieobj = {title, rating, id};
          searchMovieAPI(movieobj)
        });
      });
    });

    $('body').on('click', '.trashbutton', function () {
      let buttonclicked = $(this);
      let divid = buttonclicked.parent().parent().parent().attr("id");
      let confirmvalue = confirm("Are you sure?");
      if (confirmvalue === true) {
        deleteMovie(divid)
      };
      getMovies().then((movies) => {
        $("#container").empty();
        movies.forEach(({title, rating, id}) => {
          let movieobj = {title, rating, id};
          searchMovieAPI(movieobj)
        });
      });
    });

    $("#signinbutton").click(function(e){
      (e).preventDefault();
    });


  });