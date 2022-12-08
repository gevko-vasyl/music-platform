import React, { useState } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import Image from "next/image";
import StepWrapper from "../../components/StepWrapper";
import { MainLayout } from "../../layouts/MainLayout";
import FileUploader from "../../components/FileUploader";
import { useInput } from "../../hooks/useInput";
import { useRouter } from "next/router";
import axios from "axios";
import DefaultPhoto from "../../assets/photoUploader.png";
import DefaultAudioLogo from "../../assets/audioUploader.jpg";

export default function Create() {
	const [activeStep, setActiveStep] = useState(0);
	const [image, setImage] = useState(null);
	const [audio, setAudio] = useState(null);
	const name = useInput("");
	const artist = useInput("");
	const lyrics = useInput("");
	const router = useRouter();

	const next = () => {
		if (activeStep !== 2) {
			setActiveStep(prev => prev + 1);
		} else {
			const formData = new FormData();
			formData.append("name", name.value);
			formData.append("artist", artist.value);
			formData.append("text", lyrics.value);
			formData.append("picture", image);
			formData.append("audio", audio);
			axios
				.post("http://localhost:5000/tracks", formData)
				.then(res => router.push("/tracks"))
				.catch(e => console.log(e));
		}
	};
	const back = () => {
		setActiveStep(prev => prev - 1);
	};

	return (
		<MainLayout>
			<StepWrapper activeStep={activeStep}>
				{activeStep === 0 && (
					<Grid container direction={"column"} style={{ padding: 20 }}>
						<TextField {...name} label="Track name" style={{ marginTop: 10 }} />
						<TextField {...artist} label="Artist name" style={{ marginTop: 10 }} />
						<TextField {...lyrics} label="Lyrics" multiline rows={3} style={{ marginTop: 10 }} />
					</Grid>
				)}
				{activeStep === 1 && (
					<Box p={2}>
						<FileUploader setFile={setImage} btnText={"Upload logo"} accept="image/*">
							{image ? (
								<Image
									width="180"
									height="180"
									alt="Uploaded track logo"
									src={URL.createObjectURL(image)}
								/>
							) : (
								<Grid
									container
									justifyContent="center"
									alignItems="center"
									sx={{ width: 200, height: 200, backgroundColor: "#f4f5f7" }}
								>
									<Image alt="DefaultPhoto" src={DefaultPhoto} width="150" height="150" />
								</Grid>
							)}
						</FileUploader>
					</Box>
				)}
				{activeStep === 2 && (
					<Box p={2}>
						<FileUploader setFile={setAudio} btnText={"Upload audio"} accept="audio/*">
							<Image width="180" height="180" alt="Default audio logo" src={DefaultAudioLogo} />
							{audio && <span style={{ marginTop: 10 }}>{audio.name}</span>}
						</FileUploader>
					</Box>
				)}
			</StepWrapper>

			<Grid container justifyContent="center">
				<Button
					variant="contained"
					sx={{ width: 180, height: 50, marginRight: 20 }}
					disabled={activeStep === 0}
					onClick={back}
				>
					Back
				</Button>
				<Button variant="contained" sx={{ width: 180 }} onClick={next}>
					{activeStep === 2 ? "Upload" : "Next"}
				</Button>
			</Grid>
		</MainLayout>
	);
}
