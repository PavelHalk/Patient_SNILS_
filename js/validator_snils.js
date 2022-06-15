/*validator_snils.js for tests*/

function validateSnils(snils, error) {
	var result = false; var sum; var i;
	var checkDigit;
	if (typeof snils === "number") {
		snils = snils.toString();
	} else if (typeof snils !== "string") {
		snils = "";
	}
	if (!snils.length) {
		error.code = 1;
		error.message = "СНИЛС пуст";
	} else if (/[^0-9]/.test(snils)) {
		error.code = 2;
		error.message = "СНИЛС может состоять только из цифр";
	} else if (snils.length !== 11) {
		error.code = 3;
		error.message = "СНИЛС может состоять только из 11 цифр";
	} else {
		sum = 0;
		i = 0;

		while (i < 9) {
			sum += parseInt(snils[i]) * (9 - i);
			i+=1;
		}
		checkDigit = 0;
		if (sum < 100) {
			checkDigit = sum;
		} else if (sum > 101) {
			checkDigit = parseInt(sum % 101);
			if (checkDigit === 100) {
				checkDigit = 0;
			}
		}
		if (checkDigit === parseInt(snils.slice(-2))) {
			result = true;
		} else {
			error.code = 4;
			error.message = "Неправильное контрольное число";
		}
	}
	return result;
}
