'use strict';

export const MovieUtils = {
	fetch: function(location) {
		return fetch('/temp/movies.json')
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				return json;
			});
	}
};
