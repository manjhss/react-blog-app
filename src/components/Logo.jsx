import React from "react";
import { ModeToggle } from "./theme/mode-toggle";

const Logo = () => {
	return (
		<div className="text-3xl font-bold flex">
			B!
			<ModeToggle />g
		</div>
	);
};

export default Logo;
