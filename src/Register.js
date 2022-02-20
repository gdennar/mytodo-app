import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import "./register.css";
import "./login.css";
import { useAuth } from "./contexts/AuthContext";

function Register() {
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signUp, currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSUbmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signUp(emailRef.current.value, passwordRef.current.value);
			currentUser.updateProfile({
				displayName: nameRef.current.value,
			});
			navigate("/login");
		} catch {
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<div className="register">
			<div className="register_wrapper">
				<div className="register_container">
					<h3>Sign up</h3>
					{error && <Alert severity="error">{error}</Alert>}
					<input
						type="text"
						placeholder="Full Name"
						className="register_name_box"
						ref={nameRef}
					/>

					<input
						type="email"
						placeholder="E-mail address"
						className="register_email_box"
						ref={emailRef}
					/>

					<input
						type="password"
						placeholder="Password"
						className="register_password_box"
						ref={passwordRef}
					/>

					<input
						type="password"
						placeholder="Confirm Password"
						className="register_password_box"
						ref={passwordConfirmRef}
					/>

					<Button
						type="submit"
						className="register_button"
						variant="contained"
						disabled={loading}
						onClick={handleSUbmit}
					>
						Create an account
					</Button>
					{/* <Button className="register_google_btn" variant="outlined" startIcon={<GoogleIcon/>}>
						Sign up with Google
					</Button> */}
					<div className="registered_user">
						Already have an account?{" "}
						<Link to="/">
							<b>Login</b>
						</Link>{" "}
						now.
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register