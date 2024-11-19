const API_BASE_URL = "http://localhost:4000/api"; // Replace with your actual backend URL

export const loginUser = async (email, password) => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.error || "Something went wrong"
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
