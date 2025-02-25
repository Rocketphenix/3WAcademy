import {
	SET_AMOUNT,
	CALCULATE_DENOMINATIONS,
	SET_DENOMINATIONS,
	RESET,
} from "../action-types/denominationActionTypes";

const initialState = {
	amount: 0,
	denominations: [],
	availableUnits: [100, 50, 1], // Valeurs par défaut
};

const denominationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AMOUNT:
			return { ...state, amount: action.payload };

		case CALCULATE_DENOMINATIONS: {
			let amount = state.amount;
			const result = [];

			for (let unit of state.availableUnits) {
				if (amount >= unit) {
					let count = Math.floor(amount / unit);
					result.push({ unit, count });
					amount -= count * unit;
				}
			}

			return { ...state, denominations: result };
		}

		case SET_DENOMINATIONS:
			return { ...state, availableUnits: action.payload };

		case RESET:
			return { ...state, amount: 0, denominations: [] };

		default:
			return state;
	}
};

export default denominationReducer;
