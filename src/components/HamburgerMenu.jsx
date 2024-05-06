import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const HamburgerMenu = ({ className }) => {
	const { status } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: status,
		},
		{
			name: "Posts",
			slug: "/all-posts",
			active: status,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: status,
		},
	];

	return (
		<div className={className}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">Menu</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="p-1 rounded-md mt-1 border dark:bg-popover bg-white"
					align=""
				>
					{navItems.map((item, index) => (
						<DropdownMenuItem
							key={index}
							onClick={() => navigate(item.slug)}
							className="px-2 py-1 pr-12 rounded cursor-pointer hover:bg-accent text-sm"
						>
							{item.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default HamburgerMenu;
