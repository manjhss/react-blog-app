import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
	const navigate = useNavigate();

	const [loader, setLoader] = useState(true);
	const { status } = useSelector((state) => state.auth);

	useEffect(() => {
		// TODO: make it more easy to understand

		if (authentication && status !== authentication) {
			navigate("/login");
		} else if (!authentication && status !== authentication) {
			navigate("/all-posts");
		}

		setLoader(false);
	}, [status, navigate, authentication]);

	return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;
