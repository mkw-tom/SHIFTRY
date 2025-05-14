import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ShiftRequest } from "@shared/common/types/prisma";

type shiftRequestsState = {
	shiftRequests: ShiftRequest[] | [];
};

const initialState: shiftRequestsState = {
	shiftRequests: [],
};

export const userSlice = createSlice({
	name: "shiftRequests",
	initialState,
	reducers: {
		setShiftRequests: (state, action: PayloadAction<ShiftRequest[]>) => {
			state.shiftRequests = action.payload;
		},
		clearShiftRequests: (state) => {
			state.shiftRequests = [];
		},
	},
});

export const { setShiftRequests } = userSlice.actions;
export default userSlice.reducer;
