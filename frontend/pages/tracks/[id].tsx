import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Grid, TextField, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { MainLayout } from "../../layouts/MainLayout";
import CommentItem from "../../components/CommentItem";
import { useInput } from "../../hooks/useInput";
import { ITrack } from "../../types/track";

const TrackPage = ({ serverTrack }) => {
	const [track, setTrack] = useState<ITrack>(serverTrack);
	const router = useRouter();
	const username = useInput("");
	const commentText = useInput("");

	const addComment = async () => {
		try {
			const response = await axios.post("http://localhost:5000/tracks/comment", {
				username: username.value,
				text: commentText.value,
				trackId: track._id,
			});
			setTrack(prev => ({ ...prev, comments: [...prev.comments, response.data] }));
			username.setValue("");
			commentText.setValue("");
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<MainLayout title={`${track.name} - ${track.artist}(Music platform)`}>
			<Button variant="outlined" style={{ fontSize: 24 }} onClick={() => router.push("/tracks")}>
				Back to tracklist
			</Button>
			<Grid container style={{ margin: "20px 0" }}>
				<img src={"http://localhost:5000/" + track.picture} width="200" height="200" />
				<div style={{ marginLeft: 100 }}>
					<h1>Name - {track.name}</h1>
					<h1>Artist - {track.artist}</h1>
				</div>
			</Grid>

			<h1>Lyrics</h1>
			<p>{track.text}</p>
			<Divider />
			<h1>Comments</h1>
			<div>{track.comments.length === 0 && <h2>No comments for this track</h2>}</div>
			<Grid container spacing={4}>
				{track.comments.map((comment, index) => (
					<Grid item xs={6}>
						<CommentItem key={index} comment={comment} />
					</Grid>
				))}
			</Grid>
			<Divider sx={{ marginTop: "15px" }} />
			<Grid container sx={{ marginTop: "15px" }}>
				<TextField {...username} label="Your Name" />
				<TextField
					{...commentText}
					label="Comment"
					fullWidth
					multiline
					rows={4}
					style={{ marginTop: 10 }}
				/>

				<Button onClick={addComment} variant="contained" sx={{ marginTop: "10px" }}>
					Add comment
				</Button>
			</Grid>
		</MainLayout>
	);
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const response = await axios.get("http://localhost:5000/tracks/" + params.id);
	return { props: { serverTrack: response.data } };
};
