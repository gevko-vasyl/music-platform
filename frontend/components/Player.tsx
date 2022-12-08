import React, { useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import TrackProgress, { TrackProgressTypes } from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { usePlayerActions } from "../hooks/useActions";

import styles from "../styles/Player.module.scss";

let audio;

const Player = () => {
	const { active, currentTime, duration, volume, pause } = useTypedSelector(state => state.player);
	const { playTrack, pauseTrack, setActive, setVolume, setCurrentTime, setDuration } =
		usePlayerActions();

	useEffect(() => {
		if (!audio) {
			audio = new Audio();
		} else {
			setAudio();
			play();
		}
	}, [active]);

	const setAudio = () => {
		if (active) {
			audio.src = "http://localhost:5000/" + active.audio;
			audio.volume = volume / 100;
			audio.onloadedmetadata = () => {
				setDuration(Math.ceil(audio.duration));
			};
			audio.ontimeupdate = () => {
				setCurrentTime(Math.ceil(audio.currentTime));
			};
		}
	};

	const play = () => {
		if (pause && active) {
			playTrack();
			audio.play();
		} else {
			pauseTrack();
			audio.pause();
		}
	};

	const changeVolume = (event: Event, newValue: number) => {
		audio.volume = Number(newValue) / 100;
		setVolume(Number(newValue));
	};

	const changeCurrentTime = (event: Event, newValue: number) => {
		audio.currentTime = Number(newValue);
		setCurrentTime(Number(newValue));
	};

	if (!active) {
		return null;
	}
	return (
		<div className={styles.player}>
			<Grid container alignItems="center" spacing={12}>
				<Grid item xs={3}>
					<Grid container wrap="nowrap">
						<IconButton onClick={play}>{pause ? <PlayArrow /> : <Pause />}</IconButton>
						<Grid container direction="column" style={{ margin: "0 20px" }}>
							<div>{active?.name}</div>
							<div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<TrackProgress
						left={currentTime}
						right={duration}
						onChange={changeCurrentTime}
						type={TrackProgressTypes.TIME}
					/>
				</Grid>
				<Grid item xs={3}>
					<TrackProgress
						left={volume}
						right={100}
						onChange={changeVolume}
						type={TrackProgressTypes.VOLUME}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Player;
