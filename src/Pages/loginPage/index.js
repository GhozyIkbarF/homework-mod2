import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../lib/fetchApi";
import { login } from "../../slice/authSlice";
import "./index.css";
import Navbar from "../../Component/Navbar";

const LoginPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = new URLSearchParams(window.location.hash).get(
			"#access_token"
		);

		if (token !== null) {
			const setUserProfile = async () => {
				try {
					const response = await getUserProfile(token);
					dispatch(
						login({
							accessToken: token,
							user: response,
						})
					);
				} catch (e) {
					toast.error(e);
				}
			};

			setUserProfile();
		}
	});

	return (
		<div className="home">
			<Navbar />
			<div className="welcome">
				<h1 className="sambutan">Welcome to Spotify</h1>
			</div>
		</div>
	);
};

export default LoginPage;