import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
	const navigate = useNavigate();

	return (
		<>
			<section className="flex items-center h-screen p-16">
				<div className="container flex flex-col items-center">
					<div className="flex flex-col justify-center items-center gap-6">
						<h2 className="font-extrabold text-9xl text-red-700">
							<span className="sr-only">Error</span>404
						</h2>

						<p className="text-2xl md:text-3xl dark:text-gray-300">
							Sorry, we couldn't find this page. 😢
						</p>

						<Button onClick={() => navigate("/")}>
							Back to home
						</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Error;
