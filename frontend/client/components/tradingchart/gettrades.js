import ajax from "../ajax";

export function getBuys	(id) {
	return ajax.get(`/api/buys/${id}`)
		.then((result) => {
			return result.map(function(trade) {
				return {date: new Date(Date.parse(trade.time)), price: trade.price};
			});
		});
}

export function getSells(id) {
	return ajax.get(`/api/sells/${id}`)
		.then((result) => {
			return result.map(function(trade) {
				return {date: new Date(Date.parse(trade.time)), price: trade.price};
			});
		});
}