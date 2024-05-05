import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const { status, userData } = useSelector((state) => state.auth);

	useEffect(() => {
		try {
			if (status) {
				dispatch(login(userData));
			} else {
				dispatch(logout());
			}
		} catch (error) {
			console.log(error);
		}

		setLoading(false);
	}, []);

	return !loading ? (
		<>
			<Header />

			<main className="min-h-screen py-6">
				<Outlet />
			</main>

			<Footer />
		</>
	) : null;
}

export default App;
