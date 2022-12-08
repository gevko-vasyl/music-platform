import { PlayerState } from "../../types/player";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../../types/track";

const initialState: PlayerState = {
	active: null,
	volume: 50,
	duration: 0,
	currentTime: 0,
	pause: true,
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		playTrack: state => {
			state.pause = false;
		},
		pauseTrack: state => {
			state.pause = true;
		},
		setActive: (state, action: PayloadAction<ITrack>) => {
			state.active = action.payload;
			state.pause = true;
			state.duration = 0;
			state.currentTime = 0;
		},
		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload;
		},
		setCurrentTime: (state, action: PayloadAction<number>) => {
			state.currentTime = action.payload;
		},
		setVolume: (state, action: PayloadAction<number>) => {
			state.volume = action.payload;
		},
	},
});

export const playerActions = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
