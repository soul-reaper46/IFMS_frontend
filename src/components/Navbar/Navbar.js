import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({
	anchorEl,
	handleMenuOpen,
	handleMenuClose,
	toggleDrawer,
	handleProfile,
	onLogout,
}) {
	const navigate = useNavigate();
	//handle logout
	const handleLogout = () => {
		onLogout();
		navigate("/");
	};

	return (
		<Box
			sx={{
				position: "sticky",
				top: 0,
				width: "100%",
				height: "70px",
				background: "linear-gradient(to right, #3498db, #2f2f2f)", // Blue to light black gradient
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "0 20px",
				zIndex: 1000, // Ensures it stays on top of content
			}}
		>
			{/* Navbar Content */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				{/* Hamburger Icon */}
				<IconButton
					onClick={toggleDrawer(true)}
					sx={{
						color: "white",
						marginRight: "8px",
					}}
				>
					<MenuIcon />
				</IconButton>

				{/* Dashboard Text */}
				<Box
					sx={{
						color: "white",
						fontSize: "18px",
						fontWeight: "bold",
					}}
				>
					Dashboard
				</Box>
			</Box>

			{/* User Icon Button */}
			<IconButton
				onClick={handleMenuOpen}
				sx={{
					color: "white",
					"&:hover": {
						color: "lightgrey", // Hover color
					},
					"&.Mui-focusVisible": {
						color: "lightgrey", // Active color
					},
				}}
			>
				<PersonIcon />
			</IconButton>

			{/* User Menu */}
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem onClick={handleProfile}>
					<PersonIcon sx={{ marginRight: 2 }} />
					Profile
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<ExitToAppIcon
						sx={{ marginRight: 2 }}
					/>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	);
}

export default Navbar;
