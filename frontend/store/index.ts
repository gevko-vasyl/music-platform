import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { Action, AnyAction } from "redux";
import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { playerReducer } from "./slices/playerSlice";
import { trackReducer } from "./slices/trackSlices";
import thunk, { ThunkDispatch } from "redux-thunk";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	player: playerReducer,
	track: trackReducer,
});

const reducer = (state: ReturnType<typeof rootReducer> | undefined, action: AnyAction) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		return nextState;
	} else {
		return rootReducer(state, action);
	}
};

const makeStore = () =>
	configureStore({
		reducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
	});

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export type AppThunkDispatch = ThunkDispatch<AppState, void, AnyAction>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
