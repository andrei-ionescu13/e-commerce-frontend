const insertCharacterFromEnd = (x, c, n) => {
	const length = x.length;
	if (length > n) return x.slice(0, length - n) + c + x.slice(length - n, length);
	return x;
};
export default insertCharacterFromEnd;
