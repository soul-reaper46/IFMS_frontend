import React from "react";
import { Box, useMediaQuery, IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Slide from "@mui/material/Slide";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ViewListIcon from "@mui/icons-material/ViewList";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import StyledLink from "../../components/StyledLink/StyledLink";

function ResponsiveDrawer({ isDrawerOpen, toggleDrawer }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Drawer
			anchor="left"
			open={isDrawerOpen}
			onClose={toggleDrawer(false)}
			sx={{
				width: { xs: "100vw", sm: "25vw" }, // Full width on mobile, 25% on larger screens
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: { xs: "100vw", sm: "25vw" },
					boxSizing: "border-box",
					position: "relative",
				},
			}}
		>
			<Box
				sx={{
					width: "100%",
					textAlign: "center",
					padding: isMobile
						? "0 0 8px 0"
						: "0 0 16px 0",
				}}
			>
				{/* Close Button */}
				<IconButton
					onClick={toggleDrawer(false)}
					sx={{
						position: "absolute",
						top: 8,
						right: 8,
						color: "white",
						zIndex: 1,
						display: {
							xs: "block",
							sm: "none",
						}, // Show only on mobile
					}}
				>
					<CloseIcon />
				</IconButton>

				{/* Image Section */}
				<Box
					sx={{
						height: "200px",
						backgroundImage:
							"url(/images/menu_image.jpeg)",
						backgroundSize: "cover",
					}}
				/>
			</Box>
			<Slide
				direction="right"
				in={isDrawerOpen}
				mountOnEnter
				unmountOnExit
			>
				<List
					sx={{
						width: "100%",
						cursor: "pointer",
					}}
				>
					<ListItem
						button
						component={StyledLink}
						to="/dashboard/home"
						onClick={toggleDrawer(false)}
					>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem
						button
						component={StyledLink}
						to="/dashboard/analytics"
						onClick={toggleDrawer(false)}
					>
						<ListItemIcon>
							<AnalyticsIcon />
						</ListItemIcon>
						<ListItemText primary="Analytics" />
					</ListItem>
					<ListItem
						button
						component={StyledLink}
						to="/dashboard/invest"
						onClick={toggleDrawer(false)}
					>
						<ListItemIcon>
							<MonetizationOnIcon />
						</ListItemIcon>
						<ListItemText primary="Invest" />
					</ListItem>
					<ListItem
						button
						component={StyledLink}
						to="/dashboard/portfolio"
						onClick={toggleDrawer(false)}
					>
						<ListItemIcon>
							<FolderSpecialIcon />
						</ListItemIcon>
						<ListItemText primary="Portfolio" />
					</ListItem>
					<ListItem
						button
						component={StyledLink}
						to="/dashboard/asset"
						onClick={toggleDrawer(false)}
					>
						<ListItemIcon>
							<AccountBalanceWalletIcon />
						</ListItemIcon>
						<ListItemText primary="Asset" />
					</ListItem>
					<ListItem
						button
						component={StyledLink}
						to="/dashboard/watchlist"
						onClick={toggleDrawer(false)}
					>
						<ListItemIcon>
							<ViewListIcon />
						</ListItemIcon>
						<ListItemText primary="WatchList" />
					</ListItem>
				</List>
			</Slide>
		</Drawer>
	);
}

export default ResponsiveDrawer;
