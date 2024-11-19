import React, { useState } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	Paper,
	Avatar,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onSignUp }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [dob, setDob] = useState(null);
	const [riskprofile, setriskprofile] = useState("Moderate");
	const navigate = useNavigate();
	const [phoneError, setPhoneError] = useState("");
	const [isTouched, setIsTouched] = useState(false);
	const [error, setError] = useState("");

	const handleBlur = () => {
		setIsTouched(true);
	};

	const handlePhoneChange = (e) => {
		const value = e.target.value;

		// Validate phone number
		if (!/^\d{0,10}$/.test(value)) {
			setPhoneError(
				"Phone number must be numeric and up to 10 digits."
			);
		} else if (value.length > 0 && value.length < 10) {
			setPhoneError(
				"Phone number must be exactly 10 digits."
			);
		} else {
			setPhoneError(""); // Clear error if valid
		}

		setPhone(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !email || !password || !phone || !dob) {
			alert("All fields are required!");
			return;
		}

		if (phoneError) {
			return; // Do not proceed if phone validation failed
		}

		// Call signup and navigate to dashboard
		const success = await onSignUp(
			name,
			email,
			password,
			phone,
			dob,
			riskprofile
		);
		if (!success) {
			setError(
				"Signup failed. Please check your details and try again."
			);
		} else navigate("/dashboard");
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundImage: "url('/images/login.jpeg')", // Background image for signup page
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
					bgcolor: "rgba(255, 255, 255, 0.98  )", // Semi-transparent white background
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
								"secondary.main",
						}}
					>
						<PersonAddOutlinedIcon fontSize="large" />
					</Avatar>
				</Box>

				{/* Title */}
				<Typography
					variant="h5"
					component="h1"
					align="center"
					sx={{ mb: 2 }}
				>
					Sign Up
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
						label="Name"
						type="text"
						variant="outlined"
						fullWidth
						required
						value={name}
						onChange={(e) =>
							setName(e.target.value)
						}
					/>
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
					<TextField
						label="Phone Number"
						type="tel"
						variant="outlined"
						fullWidth
						required
						value={phone}
						onChange={handlePhoneChange}
						error={!!phoneError} // Shows error state if phoneError exists
						helperText={
							phoneError ||
							"Enter a 10-digit phone number"
						}
					/>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
					>
						<DatePicker
							label="Date of Birth"
							value={dob}
							onChange={(newValue) =>
								setDob(newValue)
							}
							onClose={handleBlur} // Mark as touched when the date picker is closed
							renderInput={(
								params
							) => (
								<TextField
									{...params}
									fullWidth
									required
									onBlur={
										handleBlur
									} // Mark as touched when the input loses focus
									error={
										!dob &&
										isTouched
									}
									helperText={
										!dob &&
										isTouched
											? "Date is required"
											: ""
									}
								/>
							)}
						/>
					</LocalizationProvider>
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
								"secondary.main",
							"&:hover": {
								backgroundColor:
									"secondary.dark",
							},
						}}
					>
						Sign Up
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
					Already have an account?{" "}
					<a href="/login">Login</a>
				</Typography>
			</Paper>
		</Box>
	);
};

export default SignUp;
