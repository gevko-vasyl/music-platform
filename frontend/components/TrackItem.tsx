import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Grid, Card, IconButton } from "@mui/material";
import { PlayArrow, Delete } from "@mui/icons-material";
import { ITrack } from "../types/track";
import { usePlayerActions, useTracksActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

import styles from "../styles/TrackItem.module.scss";

interface TrackItemProps {
	track: ITrack;
	active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
	const router = useRouter();
	const { active, currentTime, duration, volume, pause } = useTypedSelector(state => state.player);

	const { playTrack, pauseTrack, setActive, setVolume, setCurrentTime, setDuration } =
		usePlayerActions();
	const { setTracksAfterDelete } = useTracksActions();

	const play = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setActive(track);
	};

	const deleteTrack = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
		e.stopPropagation();
		try {
			await axios.delete(`http://localhost:5000/tracks/${id}`);
			setTracksAfterDelete(id);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Card className={styles.track} onClick={() => router.push("/tracks/" + track._id)}>
			<IconButton onClick={play}>
				<PlayArrow />
			</IconButton>
			<img width={70} height={70} src={"http://localhost:5000/" + track.picture} />
			<Grid container direction="column" style={{ width: 200, margin: "0 20px" }}>
				<div>{track.name}</div>
				<div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
			</Grid>

			<IconButton style={{ marginLeft: "auto" }} onClick={e => deleteTrack(e, track._id)}>
				<Delete />
			</IconButton>
		</Card>
	);
};

export default TrackItem;
