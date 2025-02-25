export const selectAmount = (state) => state.denomination.amount;
export const selectDenominations = (state) => state.denomination.denominations;
export const selectAvailableUnits = (state) =>
	state.denomination.availableUnits;
