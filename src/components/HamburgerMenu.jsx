import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const HamburgerMenu = ({ className }) => {
	const { status, userData } = useSelector((state) => state.auth);

	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: status,
		},
		{
			name: "All Posts",
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

				<DropdownMenuContent className="w-40 p-2 border rounded-lg dark:bg-black bg-white absolute -right-8">
					<DropdownMenuLabel className="text-lg">
						{userData.name}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup className="mt-2">
						{navItems.map((item, index) => (
							<DropdownMenuItem
								className="pl-2 py-1 rounded-md cursor-pointer"
								key={index}
							>
								<Link to={item.slug}>{item.name}</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default HamburgerMenu;
