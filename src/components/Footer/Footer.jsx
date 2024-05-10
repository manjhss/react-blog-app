import React from "react";
import { Mail, Github, LinkedinIcon, Twitter, Instagram } from "lucide-react";
import { Container } from "../index";
import SocialLinkButton from "../SocialLinkButton";

const Footer = () => {
	const navItems = [
		{
			icon: Github,
			url: "https://github.com/surendra-manjhi",
		},
		{
			icon: LinkedinIcon,
			url: "https://www.linkedin.com/in/surendra-manjhi",
		},
		{
			icon: Mail,
			url: "",
		},
		{
			icon: Twitter,
			url: "https://twitter.com/manjhss",
		},
		{
			icon: Instagram,
			url: "https://instagram.com/manjhss",
		},
	];

	return (
		<footer className="py-4">
			<Container
				className={
					"flex gap-2 flex-col sm:flex-row sm:gap-6 justify-center items-center"
				}
			>
				<ul className="flex flex-wrap justify-center items-center gap-6">
					<li className="text-2xl font-medium">manjhss</li>
					<li className="text-2xl font-medium">/</li>
					{navItems.map((item, index) => (
						<li key={index} className="flex">
							<SocialLinkButton url={item.url}>
								<item.icon />
							</SocialLinkButton>
						</li>
					))}
				</ul>
			</Container>
		</footer>
	);
};

export default Footer;
