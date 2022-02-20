import {
	List,
	ListItem,
	ListItemText,
	Button,
	Checkbox,
	Divider,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import { grey, orange, red } from "@mui/material/colors";
import db from "./firebase";
import "./todo.css";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function Todo({ todo, timeStamp, inprogress, id }) {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState(todo.todo);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updateTodo = () => {
		db.collection("todos").doc(todo.id).set(
			{
				todo: input,
			},
			{ merge: true }
		);

		handleClose();
	};

	function toggleInProgress() {
		db.collection("todos").doc(id).update({
			inprogress: !inprogress,
		});
	}

	return (
		<div className="todo">
			<Modal open={open} onClose={handleClose}>
				<Box className="todo_box" sx={style}>
					<h3>Update your Todo</h3>
					<input
						className="todo_input_field"
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<Button
						className="btn_modal"
						variant="contained"
						onClick={updateTodo}
					>
						Update
					</Button>
				</Box>
			</Modal>
			<List>
				<ListItem disablePadding>
					{inprogress ? (
						<CheckCircleIcon
							onClick={toggleInProgress}
							sx={{
								color: orange[800],
								"&.Mui-checked": {
									color: orange[600],
								},
							}}
						/>
					) : (
						<CheckCircleOutlineIcon onClick={toggleInProgress} />
					)}

					<ListItemText
						className={inprogress ? "complete" : "pending  "}
						primary={todo.todo}
						secondary={inprogress ? "completed" : "pending"}
					/>
					{/* <span className="todoTimestamp"> {new Date(timeStamp).toLocaleDateString("en-US")}</span> */}
					<EditIcon onClick={handleOpen} />

					<DeleteForeverIcon
						onClick={(event) => db.collection("todos").doc(todo.id).delete()}
						sx={{
							color: red[800],
						}}
					/>
				</ListItem>
				<Divider />
			</List>
		</div>
	);
}

export default Todo;