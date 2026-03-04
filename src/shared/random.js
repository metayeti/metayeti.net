/**
 * Shuffles the elements of an array in place using the Fisher-Yates algorithm.
 *
 * @param {Array} list The array to shuffle.
 */
export function shuffle(list) {
	let i = list.length;
	while (--i) {
		let r = Math.floor(Math.random() * (i + 1));
		let tmp = list[i];
		list[i] = list[r];
		list[r] = tmp;
	}
};