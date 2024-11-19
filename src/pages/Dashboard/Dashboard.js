// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";
import Navbar from "../../components/Navbar/Navbar";

function Dashboard({ onLogout }) {
	const [anchorEl, setAnchorEl] = useState(null); //state for account menu
	const [isDrawerOpen, setIsDrawerOpen] = useState(false); //state for left drawer menu
	const navigate = useNavigate();

	useEffect(() => {
		// Redirect to login if not authenticated
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	// Open the menu
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	// Close the menu
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	//handle profile
	const handleProfile = () => {
		setAnchorEl(null);
		navigate("/dashboard/profile");
	};

	//toggle the left drawer
	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setIsDrawerOpen(open);
	};

	return (
		<Box>
			{/* Navbar */}
			<Navbar
				anchorEl={anchorEl}
				handleMenuOpen={handleMenuOpen}
				handleMenuClose={handleMenuClose}
				toggleDrawer={toggleDrawer}
				handleProfile={handleProfile}
				onLogout={onLogout}
			/>

			{/* Drawer Component */}
			<ResponsiveDrawer
				isDrawerOpen={isDrawerOpen}
				toggleDrawer={toggleDrawer}
			/>

			{/* Content Below the Navbar */}
			<Box sx={{ paddingTop: "0px" }}>
				<Outlet />
			</Box>
		</Box>
	);
}

export default Dashboard;
