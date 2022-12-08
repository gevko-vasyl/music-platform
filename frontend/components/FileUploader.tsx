import React, { useRef } from "react";
import { Grid, Button } from "@mui/material";

interface FileUploaderProps {
	setFile: Function;
	accept: string;
	btnText: string;
	children: React.ReactNode;
}

const FileUploader: React.FC<FileUploaderProps> = ({ setFile, accept, btnText, children }) => {
	const ref = useRef<HTMLInputElement>();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target.files[0]);
	};
	return (
		<Grid container flexDirection="column" justifyContent="center" alignItems="center">
			<input
				type="file"
				accept={accept}
				style={{ display: "none" }}
				ref={ref}
				onChange={onChange}
			/>
			{children}
			<Button onClick={() => ref.current.click()} sx={{ marginTop: "30px" }}>
				{btnText}
			</Button>
		</Grid>
	);
};

export default FileUploader;
