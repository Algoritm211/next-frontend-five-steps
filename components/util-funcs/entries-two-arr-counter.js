

export const countEntries = (arr1, arr2) => {
	return arr1.reduce((a, c) => a + arr2.includes(c), 0);
}
