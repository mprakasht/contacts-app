
export const isEmailValid = (email) => {
	let re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	let result = re.test(email);
	return (result) ? true : false;
}

export const toTitleCase = ((str) => {
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
})

export const isNumeric = (str) => {
	return /^\d+$/.test(str);
}

export const isMobileNumber = (str) => {
	return /^[6789]\d{9}$/.test(str);
}

export const isOnlyLetters = (str) => {
	return /^[a-zA-Z]*$/g.test(str);
}

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export const getSorting = (order, orderBy) => {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export const stableSort = (array, cmp) => {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}
