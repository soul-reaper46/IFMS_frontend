const API_BASE_URL = "http://localhost:4000/api";

export const signupUser = async (userDetails) => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userDetails),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.error ||
					"Signup failed. Please try again."
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
