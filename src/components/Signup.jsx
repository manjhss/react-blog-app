import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/store/authSlice";
import { Button } from "./ui/button";
import { InputField } from ".";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";

const Signup = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm();
	const [error, setError] = useState(null);

	const create = async (data) => {
		setError(null);

		try {
			const response = await authService.createAccount(data);

			if (response) {
				const userData = await authService.getCurrentUser();

				if (userData) dispatch(login(userData));
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	return (
		<FormWrapper title="Sign Up" className="w-[400px]">
			<form onSubmit={handleSubmit(create)} className="space-y-4">
				<InputField
					type="text"
					label="Full Name: "
					placeholder="e.g. Surendra Manjhi"
					{...register("name", {
						required: true,
					})}
				/>

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
					<Button variant="destructive" className="w-full">
						{error}
					</Button>
				)}

				<Button type="submit" className="w-full">
					Sign Up
				</Button>

				<p className="text-center text-muted-foreground text-sm">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-black dark:text-white hover:underline"
					>
						Login
					</Link>
				</p>
			</form>
		</FormWrapper>
	);
};

export default Signup;
