import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	TextField,
	Button,
	Typography,
	Container,
	Paper,
	Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login({ onLogin }) {
	// State for form fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(""); // Reset errors

		const success = await onLogin(email, password);
		if (!success) {
			setError(
				"Invalid email or password. Please try again."
			);
		} else navigate("/dashboard");
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundImage: "url('/images/login.jpeg')", // Background image for login page
				backgroundSize: "cover",
				backgroundPosition: "center",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				p: 2,
			}}
		>
			<Paper
				elevation={6}
				sx={{
					padding: 4,
					borderRadius: 3,
					bgcolor: "rgba(255, 255, 255, 1)", // Semi-transparent white background
					width: { xs: "90%", sm: "400px" }, // Card width
				}}
			>
				{/* Logo at the top */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mb: 4,
					}}
				>
					<Avatar
						sx={{
							width: 56,
							height: 56,
							backgroundColor:
								"primary.main",
						}}
					>
						<LockOutlinedIcon fontSize="large" />
					</Avatar>
				</Box>

				{/* Title */}
				<Typography
					variant="h5"
					component="h1"
					align="center"
					sx={{ mb: 2 }}
				>
					Login
				</Typography>

				{/* Form */}
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}
				>
					<TextField
						label="Email"
						type="email"
						variant="outlined"
						fullWidth
						required
						value={email}
						onChange={(e) =>
							setEmail(e.target.value)
						}
					/>
					<TextField
						label="Password"
						type="password"
						variant="outlined"
						fullWidth
						required
						value={password}
						onChange={(e) =>
							setPassword(
								e.target.value
							)
						}
					/>
					{error && (
						<Typography
							color="error"
							variant="body2"
						>
							{error}
						</Typography>
					)}
					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{
							mt: 2,
							padding: 1,
							backgroundColor:
								"primary.main",
							"&:hover": {
								backgroundColor:
									"primary.dark",
							},
						}}
					>
						Login
					</Button>
				</Box>

				{/* Footer */}
				<Typography
					variant="body2"
					align="center"
					sx={{
						mt: 4,
						color: "text.secondary",
					}}
				>
					Don’t have an account?{" "}
					<a href="/signup">Sign Up</a>
				</Typography>
			</Paper>
		</Box>
	);
}

export default Login;
