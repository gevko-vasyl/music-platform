import React from "react";
import { Grid } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import { convertSecToMinAndSec } from "../utils/time";
import Slider from "@mui/material/Slider";

export enum TrackProgressTypes {
	TIME = "time",
	VOLUME = "volume",
}

interface TrackProgressProps {
	left: number;
	right: number;
	type: TrackProgressTypes;
	onChange: (event: Event, newValue: number) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({ left, right, onChange, type }) => {
	return (
		<Grid container>
			{type === TrackProgressTypes.TIME && (
				<Grid container wrap="nowrap" alignItems="center" justifyContent="space-between">
					<span>{convertSecToMinAndSec(left)}</span>
					<Slider
						aria-label="Volume"
						value={left}
						onChange={onChange}
						step={1}
						min={0}
						max={right}
						sx={{ margin: "0 10px" }}
					/>
					<span>{convertSecToMinAndSec(right)}</span>
				</Grid>
			)}
			{type === TrackProgressTypes.VOLUME && (
				<Grid container wrap="nowrap" alignItems="center">
					<VolumeUp />
					<Slider
						aria-label="Volume"
						value={left}
						onChange={onChange}
						step={1}
						min={0}
						max={right}
						valueLabelDisplay="auto"
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default TrackProgress;
