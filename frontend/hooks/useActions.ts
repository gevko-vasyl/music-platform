import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { playerActions } from "../store/slices/playerSlice";
import { trackActions } from "../store/slices/trackSlices";

export const usePlayerActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(playerActions, dispatch);
};

export const useTracksActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(trackActions, dispatch);
};
