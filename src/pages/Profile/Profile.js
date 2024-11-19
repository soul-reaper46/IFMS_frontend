import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
	Grid2,
} from "@mui/material";
import editUserApiCall from "../../services/edituserapicall";
import useAuth from "../../hooks/useAuth";

const Profile = ({ userDetails }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [user, setUser] = useState({
		name: "",
		email: "",
		phone: "",
		dob: "",
		riskProfile: "",
	});
	const { fetchAndSetUserDetails } = useAuth();

	useEffect(() => {
		if (userDetails) {
			console.log(userDetails);

			setUser(userDetails);
		}
	}, [userDetails]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setUser(userDetails); // Reset to original values
		setIsEditing(false);
	};

	const handleSubmit = async () => {
		try {
			const updatedUser = {
				name: user.name,
				email: user.email,
				phone: user.phone,
				dob: user.dob,
				riskProfile: user.riskProfile || "",
			};

			const response = await editUserApiCall(user);
			console.log(response);

			if (
				response &&
				response.data.message ===
					"User details updated successfully."
			) {
				alert("Profile updated successfully!");
				fetchAndSetUserDetails(updatedUser.email); // Refresh userDetails
				setIsEditing(false);
			}
		} catch (error) {
			console.error("Error updating profile:", error.message);
			alert("Failed to update profile. Please try again.");
		}
	};

	return (
		<Box
			id="main box"
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "90vh",
				backgroundImage: `url('/images/profile.jpeg')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				p: 2,
			}}
		>
			<Box
				sx={{
					width: {
						xs: "90%",
						sm: "80%",
						md: "70%",
						lg: "60%",
					},
					boxShadow: 6,
					bgcolor: "rgba(255, 255, 255, 0.85)",
					borderRadius: 3,
					p: 4,
				}}
			>
				<Grid2
					container
					justifyContent="space-between"
					alignItems="center"
					sx={{ mb: 3 }}
				>
					<Typography
						variant="h4"
						fontWeight="bold"
						color="primary"
					>
						Profile
					</Typography>
					{!isEditing && (
						<Button
							variant="contained"
							color="secondary"
							size="medium"
							onClick={handleEdit}
						>
							Edit
						</Button>
					)}
				</Grid2>

				<Card elevation={3} sx={{ borderRadius: 2 }}>
					<CardContent>
						<Grid2 container spacing={3}>
							{/* Name */}
							<Grid2 xs={12} sm={6}>
								<TextField
									fullWidth
									label="Name"
									name="name"
									value={
										user.name
									}
									onChange={
										handleInputChange
									}
									InputProps={{
										readOnly: !isEditing,
									}}
									variant="outlined"
								/>
							</Grid2>
							{/* Contact */}
							<Grid2 xs={12} sm={6}>
								<TextField
									fullWidth
									label="Contact"
									name="phone"
									value={
										user.phone
									}
									onChange={
										handleInputChange
									}
									InputProps={{
										readOnly: !isEditing,
									}}
									variant="outlined"
								/>
							</Grid2>
							{/* Email */}
							<Grid2 xs={12} sm={6}>
								<TextField
									fullWidth
									label="Email"
									name="email"
									value={
										user.email
									}
									InputProps={{
										readOnly: true, // Email is always non-editable
									}}
									variant="outlined"
								/>
							</Grid2>
							{/* Date of Birth */}
							<Grid2 xs={12} sm={6}>
								<TextField
									fullWidth
									label="Date of Birth"
									name="dob"
									value={
										user.dob
									}
									onChange={
										handleInputChange
									}
									InputProps={{
										readOnly: !isEditing,
									}}
									variant="outlined"
								/>
							</Grid2>
							{/* Risk Profile */}
							<Grid2 xs={12}>
								<TextField
									fullWidth
									label="Risk Profile"
									name="riskProfile"
									value={
										user.riskProfile ||
										"Not Set"
									}
									onChange={
										handleInputChange
									}
									InputProps={{
										readOnly: !isEditing,
									}}
									variant="outlined"
								/>
							</Grid2>
						</Grid2>
					</CardContent>
				</Card>

				{/* Buttons */}
				{isEditing && (
					<Box
						sx={{
							display: "flex",
							justifyContent:
								"flex-end",
							gap: 2,
							marginTop: 3,
						}}
					>
						<Button
							variant="outlined"
							color="error"
							onClick={handleCancel}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Profile;
