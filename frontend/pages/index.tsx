import React from "react";
import Navbar from "../components/Navbar";
import { MainLayout } from "../layouts/MainLayout";

export default function Index() {
	return (
		<>
			<MainLayout>
				<div className="center">
					<Navbar />
					<h1>Welcome friend!</h1>
					<h3>Here you can find the best tracks from all over the world!</h3>
				</div>
			</MainLayout>

			<style jsx>
				{`
					.center {
						margin-top: 60px;
						margin-bottom: 60px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
				`}
			</style>
		</>
	);
}
