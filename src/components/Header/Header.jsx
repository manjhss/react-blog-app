import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "..";
import { Button } from "../ui/button";
import HamburgerMenu from "../HamburgerMenu";

const Header = () => {
	const { status } = useSelector((state) => state.auth);

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
		<header>
			<Container>
				<nav className="py-4 flex justify-between items-center">
					<div>
						<Link to="/">
							<Logo />
						</Link>
					</div>

					<ul className="hidden sm:flex gap-8 items-center font-semibold">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<NavLink
										to={item.slug}
										className={({ isActive }) =>
											isActive ? "text-green-600" : ""
										}
									>
										{item.name}
									</NavLink>
								</li>
							) : null
						)}
					</ul>

					<ul className="flex gap-2">
						{!status ? (
							<li className="flex gap-2">
								<Link to="/signup">
									<Button variant="outline">Sign Up</Button>
								</Link>
								<Link to="/login">
									<Button>Login</Button>
								</Link>
							</li>
						) : (
							<>
								<li>
									<HamburgerMenu className="sm:hidden" />
								</li>
								<li>
									<LogoutBtn />
								</li>
							</>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
};

export default Header;
