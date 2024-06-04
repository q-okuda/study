export default (dest, source) => {
	for (const property in source) {
		dest[property] = source[property];
	}
	return dest;
};
