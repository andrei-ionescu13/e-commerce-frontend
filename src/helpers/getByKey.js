function getByKey(obj, key) {
	var result;

	for (var property in obj) {
		if (obj.hasOwnProperty(property)) {
			if (property === key) {
				return obj[key]; // returns the value
			} else if (typeof obj[property] === 'object') {
				// in case it is an object
				result = getByKey(obj[property], key);

				if (typeof result !== 'undefined') {
					return result;
				}
			}
		}
	}
}
export default getByKey;
