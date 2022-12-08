import axios from "axios";
import { AppThunk } from "../index";
import { trackActions } from "../slices/trackSlices";

export const fetchTracks = (): AppThunk => {
	return async dispatch => {
		try {
			const response = await axios.get("http://localhost:5000/tracks");

			dispatch(trackActions.fetchTracks(response.data));
		} catch (e) {
			dispatch(trackActions.fetchTracksError("Something went wrong with tracks uploading"));
		}
	};
};
export const searchTracks = (query: string): AppThunk => {
	return async dispatch => {
		try {
			const response = await axios.get(`http://localhost:5000/tracks/search?query=${query}`);

			dispatch(trackActions.fetchTracks(response.data));
		} catch (e) {
			dispatch(trackActions.fetchTracksError("Something went wrong with tracks uploading"));
		}
	};
};
