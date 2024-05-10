import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button } from "./ui/button";
import { InputField } from ".";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm();
	const [error, setError] = useState(null);

	const login = async (data) => {
		setError(null);

		try {
			const session = await authService.login(data);

			if (session) {
				const userData = await authService.getCurrentUser();

				if (userData) {
					const { $id, name, email } = userData;
					dispatch(authLogin({ $id, name, email }));
				}

				navigate("/all-posts");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<FormWrapper title="Login" className="w-[400px]">
			<form onSubmit={handleSubmit(login)} className="space-y-4">
				<InputField
					type="email"
					label="Email: "
					placeholder="example@gmail.com"
					{...register("email", {
						required: true,
						validate: {
							matchPattern: (value) =>
								/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
									value
								) || "Email address must be a valid address",
						},
					})}
				/>

				<InputField
					type="password"
					label="Password: "
					placeholder="******"
					{...register("password", {
						required: true,
					})}
				/>

				{error && (
					<button className="px-4 py-2 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 rounded-md text-sm font-medium">
						{error}
					</button>
				)}

				<Button type="submit" className="w-full">
					Login
				</Button>

				<p className="text-center text-muted-foreground text-sm">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-black dark:text-white hover:underline"
					>
						Sign Up
					</Link>
				</p>
			</form>
		</FormWrapper>
	);
};

export default Login;
