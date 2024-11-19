import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import useAuth from "./hooks/useAuth";

// Import pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Portfolio from "./pages/Portfolio/Portfolio";
import HomePage from "./pages/Home/Home";
import ProfilePage from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import Analytics from "./pages/Analytics/Analytics";
import Asset from "./pages/Asset/Asset";
import Invest from "./pages/Invest/invest";
import WatchList from "./pages/WatchList/WatchList";

function App() {
	const { isAuthenticated, userDetails, login, signup, logout } =
		useAuth();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					{/* Redirect to Login or Dashboard based on authentication */}
					<Route
						path="/"
						element={
							isAuthenticated ? (
								<Navigate
									to="/dashboard"
									replace
								/>
							) : (
								<LoginPage
									onLogin={
										login
									}
								/>
							)
						}
					/>

					{/* Authenticated routes */}
					<Route
						path="/dashboard/*"
						element={
							isAuthenticated ? (
								<Dashboard
									onLogout={
										logout
									}
								/>
							) : (
								<Navigate
									to="/"
									replace
								/>
							)
						}
					>
						{/* Redirect to /home by default when inside Dashboard */}
						<Route
							index
							element={
								<Navigate
									to="home"
									replace
								/>
							}
						/>
						<Route
							path="home"
							element={<HomePage />}
						/>
						<Route
							path="profile"
							element={
								<ProfilePage
									userDetails={
										userDetails
									}
								/>
							}
						/>
						<Route
							path="analytics"
							element={<Analytics />}
						/>
						<Route
							path="asset"
							element={<Asset />}
						/>
						<Route
							path="invest"
							element={<Invest />}
						/>
						<Route
							path="watchlist"
							element={<WatchList />}
						/>
						<Route
							path="portfolio"
							element={<Portfolio />}
						/>
						{/* Add more nested routes as needed */}
					</Route>

					{/* Other pages */}
					<Route
						path="login"
						element={
							<LoginPage
								onLogin={login}
							/>
						}
					/>
					<Route
						path="signup"
						element={
							<SignUp
								onSignUp={
									signup
								}
							/>
						}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
