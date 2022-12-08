import React from "react";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
	title?: string;
	description?: string;
	keywords?: string;
	children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
	title,
	description,
	keywords,
	children,
}) => {
	return (
		<div>
			<Head>
				<title>{title || "Music platform"}</title>
				<meta name="description" content={"Best music platform ever." + description} />
				<meta name="robots" content="index, follow" />
				<meta name="keywords" content={keywords || "Music, trend music, platform, free upload"} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Navbar />
			<Container style={{ marginTop: "90px", marginBottom: "90px" }}>{children}</Container>
			<Player />
		</div>
	);
};
