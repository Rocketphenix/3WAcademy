import {
	SET_AMOUNT,
	CALCULATE_DENOMINATIONS,
	SET_DENOMINATIONS,
	RESET,
} from "../action-types/denominationActionTypes";

export const setAmount = (amount) => ({
	type: SET_AMOUNT,
	payload: amount,
});

export const calculateDenominations = () => ({
	type: CALCULATE_DENOMINATIONS,
});

export const setDenominations = (denominations) => ({
	type: SET_DENOMINATIONS,
	payload: denominations,
});

export const reset = () => ({
	type: RESET,
});
