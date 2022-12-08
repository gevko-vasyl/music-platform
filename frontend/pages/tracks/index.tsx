import React, { useState } from "react";
import { Grid, Card, Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MainLayout } from "../../layouts/MainLayout";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AppThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/thunks/tracks";
import { useDispatch } from "react-redux";

export default function Index() {
	const [query, setQuery] = useState("");
	const [timer, setTimer] = useState(null);
	const { tracks, error } = useTypedSelector(state => state.track);
	const dispatch = useDispatch() as AppThunkDispatch;

	const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		if (timer) {
			clearTimeout(timer);
		}
		setTimer(
			setTimeout(async () => {
				await dispatch(await searchTracks(e.target.value));
			}, 500)
		);
	};

	if (error) {
		return (
			<MainLayout title={"Tracklist-music platform"}>
				<h1>{error}</h1>
			</MainLayout>
		);
	}
	return (
		<MainLayout title={"Tracklist-music platform"}>
			<Grid container justifyContent="center">
				<Card style={{ width: 900 }}>
					<Box p={5}>
						<Grid container flexDirection="column" justifyContent="center" alignItems="center">
							<h1>Track list</h1>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									width: 600,
								}}
							>
								<SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
								<TextField fullWidth value={query} label="Search by name" onChange={search} />
							</Box>
						</Grid>
					</Box>
					<TrackList tracks={tracks} />
				</Card>
			</Grid>
		</MainLayout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
	const dispatch = store.dispatch as AppThunkDispatch;
	await dispatch(await fetchTracks());
	return {
		props: {},
	};
});
