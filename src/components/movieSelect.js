'use strict';

import React from 'react';

import MovieActions from '../actions/movieActions';
import MovieStore from '../stores/movieStore';

export class MovieSelect extends React.Component {

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

	updateGenre(e) {
		MovieActions.updateGenre(e.target.value);
	}

	render() {
		let options = [];
		let genres = [];

		// check if movie array is not empty
		if(this.state.movies.length > 0) {
			// Get list of all unique genres
			this.state.movies.map(function(movie) {
				return movie.genres.map(function(genre) {
					return genres.push(genre);
				});
			});
			genres = genres.filter(function(item, pos) {
				return genres.indexOf(item) == pos;
			});

			for (let key in genres) {
				options.push(<option key={ key } value={ genres[key] }>{ genres[key] }</option>);
			}
		}

		return(
			<div className='inner-wrap'>
				<label htmlFor='categorySelect' className='hide-visually'>Select movie category</label>
				<select id='categorySelect' onChange={this.updateGenre}>
					<option value=''>View All</option>
					{ options }
				</select>
			</div>
		);
	}

}
 
export default MovieSelect;
