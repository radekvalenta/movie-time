'use strict';

import React from 'react';

import MovieActions from '../actions/movieActions';
import MovieStore from '../stores/movieStore';

export class MovieTable extends React.Component {

	constructor() {
		super();
		this.state = MovieStore.getState();
	}

	componentDidMount() {
		MovieActions.fetchMovies(this.state);
		MovieStore.listen(this._onChange.bind(this));
	}

	componentWillUnmount() {
		MovieStore.unlisten(this._onChange.bind(this));
	}

	_onChange(state) {
		this.setState({
			movies: state.movies,
			selectedGenre: state.selectedGenre
		});
	}

	render() {
		let rows = [];
		// check if movie array is not empty
		if(this.state.movies.length > 0) {
			if(this.state.selectedGenre !== '') {
				// filter movies by genre
				let selectedGenre = this.state.selectedGenre;
				this.state.movies.map(function(movie) {
					return movie.genres.filter(function(genre) {
						if(genre === selectedGenre) {
							rows.push(
								<tr key={ Math.random() }>
									<td>{ movie.title }</td>
									<td>{ movie.genres.join(', ') }</td>
								</tr>);
						}
					});
				});
			} else {
				// view all movies
				for (let key in this.state.movies) {
					rows.push(
						<tr key={ Math.random() }>
							<td>{ this.state.movies[key].title }</td>
							<td>{ this.state.movies[key].genres.join(', ') }</td>
						</tr>);
				}
			}
		}

		return(
			<table>
				<tbody>{ rows }</tbody>
			</table>
		);
	}

}
 
export default MovieTable;
