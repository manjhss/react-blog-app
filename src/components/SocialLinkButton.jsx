import React from "react";

const SocialLinkButton = ({ url, children }) => {
	return (
		<button className="hover:text-muted-foreground">
			<a href={url} target="_blank" className="">
				{children}
			</a>
		</button>
	);
};

export default SocialLinkButton;
