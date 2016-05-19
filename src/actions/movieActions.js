'use strict';

import alt from '../dispatcher';
import {MovieUtils} from '../utils/movieUtils';

export class MovieActions {

	updateGenre(genre) {
		this.dispatch(genre);
	}

	updateMovies(movies) {
		this.dispatch(movies);
	}

	fetchMovies(movies) {
		this.dispatch();
		MovieUtils.fetch(movies)
			.then((respond) => {
				this.actions.updateMovies(respond);
			})
			.catch((respond) => {
				console.log(respond);
				this.actions.moviesFailed(respond);
			});
	}

	moviesFailed(errorMessage) {
		this.dispatch(errorMessage);
	}

}

export default alt.createActions(MovieActions);
