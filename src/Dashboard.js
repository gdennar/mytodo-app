import db from "./firebase";
import firebase from "./firebase";
import { Navigate } from "react-router-dom";
import "./dashboard.css";
import { Button, Avatar, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import LogoutIcon from "@mui/icons-material/Logout";
import Alert from "@mui/material/Alert";
import { useAuth } from "./contexts/AuthContext";
import { storage } from "./firebase";
import {  serverTimestamp } from "firebase/firestore";
import useMounted from "./contexts/useMounted";

function Dashboard() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState("");
	const { currentUser, logout } = useAuth();
	const mounted = useMounted();

	// Calling Firestore Database
	useEffect(() => {
		db.collection("todos")
			.orderBy("timeStamp", "desc")
			.onSnapshot((snapshot) => {
				setTodos(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						todo: doc.data().todo,
						inprogress: doc.data().inprogress,
					}))
				);
			});
	}, []);

	const addTodo = (e) => {
		e.preventDefault();
		db.collection("todos").add({
			todo: input,
			timeStamp: serverTimestamp(),
			inprogress: false,
		});

		setInput(" ");
	};

	const handleImage = (e) => {
		e.preventDefault();
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = (e) => {
		e.preventDefault();
		setMessage("Image selected, click upload");
		const uploadImage = storage.ref(`images/${image.name}`).put(image);
		uploadImage.on(
			"state_changed",
			(snapshot) => {},
			(err) => {
				console.log(err);
			},
			() => {
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						setUrl(url);
					});
			}
		);
	};

	async function handleLogout(e) {
		e.preventDefault();
		setError("");

		try {
			await logout();
			Navigate("/");
		} catch {
			setError("Oops! something went wrong, try again");
		}
	}

	return (
		<div className="dashboard">
			<div className="dashboard_container">
				<div id="profile_wrapper">
					<div className="dashboard_profile">
						<div className="dasboard_greeting">
							<div className="profile_pic">
								<label htmlFor="img">
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="span"
									>
										<Avatar
											className="dashboard_avatar"
											alt="Profile pic"
											src={url}
											sx={{ width: 100, height: 100 }}
										/>
									</IconButton>
								</label>
								<Button
									className="image_add_btn"
									onClick={handleUpload}
									variant="contained"
								>
									UPLOAD
								</Button>
								<div className="upload_alert"> {message}</div>
								<input
									className="choose_file"
									type="file"
									id="img"
									accept="image"
									onChange={handleImage}
								/>
							</div>
							<div className="dashboard_info">
								<div className="users_email">
									Hello,
									<div className="user_display">
										{currentUser.displayName
											? currentUser.displayName
											: currentUser.email}
									</div>
								</div>
							</div>
							<div className="dashboard_btn">
								<Button
									className="logout-btn"
									variant="contained"
									startIcon={<LogoutIcon />}
									onClick={handleLogout}
								>
									{error && <Alert severity="error">{error}</Alert>}
									Logout
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Todo Input */}
				<div className="toDo_container">
					<div className="todo_formInput">
						{/* <div className="todo_header">MY TODO APP</div> */}
						<div className="todo_input">
							<TextField
								id="standard-basic"
								label="Write a Task"
								variant="standard"
								className="todo_item"
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>

							<Button
								className="todo_add_btn"
								onClick={addTodo}
								variant="contained"
								disabled={!input}
							>
								ADD
							</Button>
						</div>
					</div>

					{/* Todo List */}
					<div className="todo_list">
						<ul>
							{todos
								? todos.map((todo, index) => (
										<Todo
											todo={todo}
											inprogress={todo.inprogress}
											id={todo.id}
											key={index}
											timeStamp={todo.timeStamp}
										/>
								  ))
								: ""}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;