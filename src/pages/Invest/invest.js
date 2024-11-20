import React, { useState, useEffect } from "react";
import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Button,
	TextField,
	Box,
} from "@mui/material";

function Invest() {
	const [fundsData, setFundsData] = useState([]);
	const [editableRow, setEditableRow] = useState(null); // Track which row is being edited
	const [editedData, setEditedData] = useState({}); // Store the edited row data
	const [isInserting, setIsInserting] = useState(false); // Track if in insert mode
	const [newFundData, setNewFundData] = useState({
		FundName: "",
		FundType: "",
		StrategyID: "",
	}); // Store new fund data

	useEffect(() => {
		fetchFundsData();
	}, []);

	const fetchFundsData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/funds"
			);
			const data = await response.json();
			setFundsData(data.data); // Assuming API returns { data: [...] }
		} catch (error) {
			console.error("Error fetching Funds data:", error);
		}
	};

	const handleEdit = (row) => {
		setEditableRow(row.FundID); // Set the row to editable
		setEditedData(row); // Populate editedData with the row's current data
	};

	const handleCancel = () => {
		setEditableRow(null); // Exit editing mode without saving changes
		setEditedData({}); // Clear edited data
	};

	const handleInsertCancel = () => {
		setIsInserting(false); // Exit insert mode
		setNewFundData({ FundName: "", FundType: "", StrategyID: "" }); // Clear new fund data
	};

	const handleChange = (field, value) => {
		setEditedData((prevData) => ({
			...prevData,
			[field]: value, // Update the specific field being edited
		}));
	};

	const handleNewFundChange = (field, value) => {
		setNewFundData((prevData) => ({
			...prevData,
			[field]: value, // Update the specific field for the new fund
		}));
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/updatefunds",
				{
					method: "PUT",
					headers: {
						"Content-Type":
							"application/json",
					},
					body: JSON.stringify(editedData), // Send updated row data
				}
			);

			if (response.ok) {
				// Update the local state with the updated row
				setFundsData((prevFunds) =>
					prevFunds.map((fund) =>
						fund.FundID ===
						editedData.FundID
							? editedData
							: fund
					)
				);
				setEditableRow(null); // Exit editing mode
				alert("Fund updated successfully!");
			} else {
				console.error(
					"Failed to update fund:",
					response.statusText
				);
			}
		} catch (error) {
			console.error("Error updating fund:", error);
		}
	};

	const handleInsertSubmit = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/insertfunds",
				{
					method: "POST",
					headers: {
						"Content-Type":
							"application/json",
					},
					body: JSON.stringify({
						FundName: newFundData.FundName,
						FundType: newFundData.FundType,
						StrategyID: newFundData.StrategyID,
					}),
				}
			);

			if (response.ok) {
				alert("New fund added successfully!");
				setIsInserting(false); // Exit insert mode
				setNewFundData({
					FundName: "",
					FundType: "",
					StrategyID: "",
				}); // Clear the form
				fetchFundsData(); // Refresh the table data
			} else {
				console.error(
					"Failed to add fund:",
					response.statusText
				);
			}
		} catch (error) {
			console.error("Error adding fund:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" align="center" gutterBottom>
				Funds
			</Typography>

			{/* Insert Button */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					mb: 2,
				}}
			>
				{!isInserting && (
					<Button
						variant="contained"
						color="primary"
						onClick={() =>
							setIsInserting(true)
						}
					>
						Insert Fund
					</Button>
				)}
			</Box>

			{/* Funds Table */}
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6" gutterBottom>
					Funds Table
				</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									Fund
									Name
								</TableCell>
								<TableCell>
									Fund
									Type
								</TableCell>
								<TableCell>
									Strategy
									ID
								</TableCell>
								<TableCell>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* Insert Row */}
							{isInserting && (
								<TableRow>
									<TableCell>
										<TextField
											value={
												newFundData.FundName
											}
											onChange={(
												e
											) =>
												handleNewFundChange(
													"FundName",
													e
														.target
														.value
												)
											}
											placeholder="Fund Name"
										/>
									</TableCell>
									<TableCell>
										<TextField
											value={
												newFundData.FundType
											}
											onChange={(
												e
											) =>
												handleNewFundChange(
													"FundType",
													e
														.target
														.value
												)
											}
											placeholder="Fund Type"
										/>
									</TableCell>
									<TableCell>
										<TextField
											value={
												newFundData.StrategyID
											}
											onChange={(
												e
											) =>
												handleNewFundChange(
													"StrategyID",
													e
														.target
														.value
												)
											}
											placeholder="Strategy ID"
										/>
									</TableCell>
									<TableCell>
										<Button
											variant="contained"
											color="success"
											onClick={
												handleInsertSubmit
											}
											sx={{
												mr: 1,
											}}
										>
											Submit
										</Button>
										<Button
											variant="outlined"
											color="error"
											onClick={
												handleInsertCancel
											}
										>
											Cancel
										</Button>
									</TableCell>
								</TableRow>
							)}

							{/* Existing Rows */}
							{fundsData.map(
								(row) => (
									<TableRow
										key={
											row.FundID
										}
									>
										<TableCell>
											{editableRow ===
											row.FundID ? (
												<TextField
													value={
														editedData.FundName
													}
													onChange={(
														e
													) =>
														handleChange(
															"FundName",
															e
																.target
																.value
														)
													}
												/>
											) : (
												row.FundName
											)}
										</TableCell>
										<TableCell>
											{editableRow ===
											row.FundID ? (
												<TextField
													value={
														editedData.FundType
													}
													onChange={(
														e
													) =>
														handleChange(
															"FundType",
															e
																.target
																.value
														)
													}
												/>
											) : (
												row.FundType
											)}
										</TableCell>
										<TableCell>
											{editableRow ===
											row.FundID ? (
												<TextField
													value={
														editedData.StrategyID
													}
													onChange={(
														e
													) =>
														handleChange(
															"StrategyID",
															e
																.target
																.value
														)
													}
												/>
											) : (
												row.StrategyID
											)}
										</TableCell>
										<TableCell>
											{editableRow ===
											row.FundID ? (
												<>
													<Button
														variant="contained"
														color="success"
														onClick={
															handleSubmit
														}
														sx={{
															mr: 1,
														}}
													>
														Submit
													</Button>
													<Button
														variant="outlined"
														color="error"
														onClick={
															handleCancel
														}
													>
														Cancel
													</Button>
												</>
											) : (
												<Button
													variant="contained"
													color="primary"
													onClick={() =>
														handleEdit(
															row
														)
													}
												>
													Edit
												</Button>
											)}
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
}

export default Invest;
