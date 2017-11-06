import ajax from "./ajax";

function parsePoint(point) {
	point.date = new Date(point.timestamp);
	point.open = true;
	return point;
}

function addCloseValues(nextValue, initialPreviousValue) {
	if(!initialPreviousValue) {
		return [nextValue];
	}

	function getDifferenceInMinutes(nextValue, previousValue) {
		return (nextValue.date.getTime() - previousValue.date.getTime()) / 60000;
	}

	const values = [];
	let workingValue = initialPreviousValue;

	//add values inbetween
	while(getDifferenceInMinutes(nextValue, workingValue) > 10) { //can we add a value in between
		const newValue = JSON.parse(JSON.stringify(workingValue));
		newValue.date = new Date(workingValue.date.getTime() + 5 * 60000); //adding five minutes
		newValue.open = false;
		values.push(newValue);
		workingValue = newValue;
	}

	values.push(nextValue);
	return values;
}

export default function(id) {

	return ajax.get(`/api/stock/${id}`)
		.then((result) => {
			result.points.reduce((result, currentValue, index, array) => {
				currentValue = parsePoint(currentValue);
				const allValuesSinceLastValue = addCloseValues(currentValue, result[result.length - 1]);
				result.push(...allValuesSinceLastValue);
				return result;
			}, []);

			return Promise.resolve(result.points);
	});
}