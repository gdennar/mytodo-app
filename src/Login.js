import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useAuth } from "./contexts/AuthContext";
import useMounted from "./contexts/useMounted";

function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const mounted = useMounted();

	async function handleSUbmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/dashboard");
		} catch {
			setError("Incorrect Email or Password");
		}

		setLoading(false);
	}

	return (
		// LOGIN
		<div className="login">
			<div className="login_wrapper">
				<div className="login_background"></div>
				<div className="login_container">
					<h3>Login</h3>
					{error && <Alert severity="error">{error}</Alert>}
					<input
						type="email"
						placeholder="Enter your e-mail"
						ref={emailRef}
						required
					/>

					<input
						type="password"
						placeholder="Enter Password"
						ref={passwordRef}
						required
					/>

					<Button
						className="login_btn"
						variant="contained"
						disabled={loading}
						onClick={handleSUbmit}
					>
						Login
					</Button>

					{/* <Button className="login_google_btn" variant="outlined" startIcon={<GoogleIcon/>}  >
                      Login with Google 
					</Button> */}

					<div className="register_btn">
						Don't have an account?{" "}
						<Link to="/register">
							<b>Register</b>
						</Link>{" "}
						now
					</div>
					<div className="forgot_password">
						<Link to="/reset">
							<b>Forgot Password?</b>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
