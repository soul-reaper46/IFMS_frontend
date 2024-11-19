// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { loginUser } from "../services/loginapicall";
import { signupUser } from "../services/signupapicall";
import { fetchUserDetails } from "../services/getuserapicall";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		phone: "",
		dob: "",
		riskProfile: null,
	});

	const fetchAndSetUserDetails = async (email) => {
		try {
			const data = await fetchUserDetails(email);

			const formatDate = (dateString) => {
				const date = new Date(dateString);
				return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
			};

			const updatedDetails = {
				name: data.user.name,
				email: data.user.email,
				phone: data.user.contact,
				dob: formatDate(data.user.dateOfBirth),
				riskProfile: data.user.riskProfile,
			};

			setUserDetails((prevState) => ({
				...prevState,
				...updatedDetails,
			}));

			console.log(
				"inside fetchandset",
				data,
				updatedDetails,
				userDetails
			);
		} catch (error) {
			console.error(
				"Error fetching user details:",
				error.message
			);
			setIsAuthenticated(false);
			localStorage.removeItem("email");
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsAuthenticated(!!token);
		const email = localStorage.getItem("email");

		if (token && email) {
			fetchAndSetUserDetails(email);
		}
	}, [isAuthenticated]);

	const login = async (email, password) => {
		try {
			const data = await loginUser(email, password);

			localStorage.setItem("token", data.token); // Save token to localStorage
			localStorage.setItem("email", email);
			setIsAuthenticated(true);
			return true; // Indicate success
		} catch (error) {
			console.error(error.message);
			return false; // Indicate failure
		}
	};

	const signup = async (name, email, password, phone, dob) => {
		try {
			const userDetails = {
				name: name,
				email: email,
				newpassword: password,
				phone: phone,
				dob: dob,
			};
			const data = await signupUser(userDetails);
			localStorage.setItem("token", data.token);
			localStorage.setItem("email", userDetails.email);
			setIsAuthenticated(true);
			return true;
		} catch (error) {
			console.error(error.message);
			return false;
		}
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUserDetails(null);
		localStorage.removeItem("email");
		localStorage.removeItem("token");
	};

	return {
		isAuthenticated,
		userDetails,
		login,
		signup,
		logout,
		fetchAndSetUserDetails,
	};
};

export default useAuth;
