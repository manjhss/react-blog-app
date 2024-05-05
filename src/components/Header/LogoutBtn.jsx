import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { onLogoutPost } from "../../store/postSlice";
import { Button } from "../ui/button";

const LogoutBtn = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		authService
			.logout()
			.then(() => {
				dispatch(logout());
				dispatch(onLogoutPost());
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return <Button onClick={logoutHandler}>Logout</Button>;
};

export default LogoutBtn;
