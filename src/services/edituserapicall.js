const API_BASE_URL = "http://localhost:4000/api";

const editUserApiCall = async (userData) => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/user/update-user-details`,
			{
				method: "PUT", // Use PUT method as per your API requirements
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			}
		);

		const data = await response.json();
		return { status: response.status, data };
	} catch (error) {
		console.error("Update failed:", error.message);
		return {
			status: 500,
			data: {
				error: "Server error, please try again later.",
			},
		};
	}
};

export default editUserApiCall;
