import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackState } from "../../types/track";

const initialState: TrackState = {
	tracks: [],
	error: "",
};

export const trackSlice = createSlice({
	name: "tracks",
	initialState,
	reducers: {
		fetchTracks: (state, { payload }) => {
			state.tracks = payload;
			state.error = "";
		},
		fetchTracksError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setTracksAfterDelete: (state, action: PayloadAction<string>) => {
			state.tracks = state.tracks.filter(track => track._id !== action.payload);
		},
	},
});

export const trackActions = trackSlice.actions;

export const trackReducer = trackSlice.reducer;
