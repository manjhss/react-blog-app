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
			<Container>
				<ul className="flex justify-center items-center gap-6">
					<li className="text-2xl flex gap-4 font-medium">
						manjhss <span>/</span>
					</li>

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
