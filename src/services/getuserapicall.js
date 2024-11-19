const API_BASE_URL = "http://localhost:4000/api";

export const fetchUserDetails = async (email) => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/user/get-user-details`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }), // Send email in POST body
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.error ||
					"Failed to fetch user details."
			);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
