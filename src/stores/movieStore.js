'use strict';

import alt from '../dispatcher';
import MovieActions from '../actions/movieActions';

export class MovieStore {

	constructor() {

		this.movies = [];
		this.selectedGenre = '';
		this.errorMessage = null;

		this.bindListeners({
			handleUpdateGenre: MovieActions.UPDATE_GENRE,
			handleUpdateMovies: MovieActions.UPDATE_MOVIES,
			handleFetchMovies: MovieActions.FETCH_MOVIES,
			handleMoviesFailed: MovieActions.MOVIES_FAILED
		});
	}

	handleUpdateGenre(genre) {
		this.selectedGenre = genre;
	}

	handleUpdateMovies(movies) {
		this.movies = movies;
		this.errorMessage = null;
	}

	handleFetchMovies() {
		this.movies = [];
	}

	handleMoviesFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}


}

export default alt.createStore(MovieStore, 'MovieStore');
