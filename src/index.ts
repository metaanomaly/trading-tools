interface Movie {
    name: string;
    poster: string;
}

// ----------------------------------------------

const random = {
    name: 'Example Movie Title'
};

function displayMovie(movie: Movie) {
    console.log(movie.name);
}

displayMovie(random as Movie);
