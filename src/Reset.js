import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./reset.css";
import "./login.css"; //css in reset is from login.css
import { useAuth } from "./contexts/AuthContext";
import Alert from "@mui/material/Alert";

function Reset() {
	const { passwordReset } = useAuth();
	const emailRef = useRef();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await passwordReset(emailRef.current.value);
			setMessage("Check your inbox for further instructions");
			setTimeout(() => {
				navigate("/");
			}, 3000);
		} catch {
			setError("Failed to reset your password");
		}

		setLoading(false);
	}

	return (
		<div className="reset">
			<div className="reset_wrapper">
				<div className="reset_container">
					{error && <Alert severity="error"> {error}</Alert>}
					{message && <Alert severity="success"> {message}</Alert>}
					<h3>Reset your Password</h3>
					<input
						type="email"
						placeholder="Enter your email address"
						ref={emailRef}
					/>

					<Button
						type="submit"
						onClick={handleSubmit}
						disabled={loading}
						className="reset_btn"
						variant="contained"
					>
						Reset Password
					</Button>

					<div className="back_to_register">
						Remeber your password?{" "}
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

export default Reset;