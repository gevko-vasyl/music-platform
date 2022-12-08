import React from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import { IComment } from "../types/track";

interface CommentItemProps {
	comment: IComment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
	return (
		<Card sx={{ backgroundColor: "rgb(236, 236, 42)" }}>
			<Box p={2}>
				<h2>{comment.username}</h2>
				<p>{comment.text}</p>
			</Box>
		</Card>
	);
};

export default CommentItem;
