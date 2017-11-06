/**
 * Documentation on how to use fetch: https://github.github.io/fetch/
 */

export default {

	get: (url) => {
		return fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "same-origin" //do I need this?
		}).then(function(response) {
			/*response.status     //=> number 100–599
			response.statusText //=> String
			response.headers    //=> Headers
			response.url        //=> String*/

			return response.json();
		}, function(error) {
			//error.message //=> String
		});
	},

};