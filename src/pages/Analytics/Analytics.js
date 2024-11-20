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
} from "@mui/material";

function Analytics() {
	const [transactionData, setTransactionData] = useState([]);
	const [performanceReportData, setPerformanceReportData] = useState([]);
	const [riskAssessmentData, setRiskAssessmentData] = useState([]);

	useEffect(() => {
		fetchTransactionData();
		fetchPerformanceReportData();
		fetchRiskAssessmentData();
	}, []);

	const fetchTransactionData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/transactions"
			);
			const data = await response.json();
			setTransactionData(data.data); // Assuming data is in data.data
		} catch (error) {
			console.error(
				"Error fetching Transaction data:",
				error
			);
		}
	};

	const fetchPerformanceReportData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/performance-reports"
			);
			const data = await response.json();
			setPerformanceReportData(data.data);
		} catch (error) {
			console.error(
				"Error fetching Performance Report data:",
				error
			);
		}
	};

	const fetchRiskAssessmentData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/risk-assessments"
			);
			const data = await response.json();
			setRiskAssessmentData(data.data);
		} catch (error) {
			console.error(
				"Error fetching Risk Assessment data:",
				error
			);
		}
	};

	const handleDelete = async (assessmentID) => {
		try {
			const response = await fetch(
				`http://localhost:4000/auth/riskassessment/${assessmentID}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
				alert("Risk Assessment deleted successfully!");
				// Remove the deleted row from the local state
				setRiskAssessmentData((prevData) =>
					prevData.filter(
						(row) =>
							row.AssessmentID !==
							assessmentID
					)
				);
			} else {
				console.error(
					"Failed to delete Risk Assessment:",
					response.statusText
				);
			}
		} catch (error) {
			console.error("Error deleting Risk Assessment:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" align="center" gutterBottom>
				Analytics
			</Typography>

			{/* Transaction Table */}
			<Paper sx={{ mb: 3, p: 2 }}>
				<Typography variant="h6" gutterBottom>
					Transaction Table
				</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									Transaction
									Type
								</TableCell>
								<TableCell>
									Transaction
									Amount
								</TableCell>
								<TableCell>
									Transaction
									Date
								</TableCell>
								<TableCell>
									Asset ID
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{transactionData.map(
								(row) => (
									<TableRow
										key={
											row.AssetID
										}
									>
										<TableCell>
											{
												row.TransactionType
											}
										</TableCell>
										<TableCell>
											{
												row.TransactionAmount
											}
										</TableCell>
										<TableCell>
											{
												row.TransactionDate
											}
										</TableCell>
										<TableCell>
											{
												row.AssetID
											}
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			{/* Performance Report Table */}
			<Paper sx={{ mb: 3, p: 2 }}>
				<Typography variant="h6" gutterBottom>
					Performance Report Table
				</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									Report
									Date
								</TableCell>
								<TableCell>
									Fund ID
								</TableCell>
								<TableCell>
									Cash
									Capital
								</TableCell>
								<TableCell>
									Asset
									Value
								</TableCell>
								<TableCell>
									Liabilities
									Value
								</TableCell>
								<TableCell>
									Asset
									Mix
									Value
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{performanceReportData.map(
								(row) => (
									<TableRow
										key={
											row.FundID
										}
									>
										<TableCell>
											{
												row.ReportDate
											}
										</TableCell>
										<TableCell>
											{
												row.FundID
											}
										</TableCell>
										<TableCell>
											{
												row.CashCapital
											}
										</TableCell>
										<TableCell>
											{
												row.AssetValue
											}
										</TableCell>
										<TableCell>
											{
												row.LiabilitiesValue
											}
										</TableCell>
										<TableCell>
											{
												row.AssetMixValue
											}
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			{/* Risk Assessment Table */}
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6" gutterBottom>
					Risk Assessment Table
				</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									Risk
									Score
								</TableCell>
								<TableCell>
									Volatility
									Measure
								</TableCell>
								<TableCell>
									Assessment
									Date
								</TableCell>
								<TableCell>
									Fund ID
								</TableCell>
								<TableCell>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{riskAssessmentData.map(
								(row) => (
									<TableRow
										key={
											row.AssessmentID
										}
									>
										<TableCell>
											{
												row.RiskScore
											}
										</TableCell>
										<TableCell>
											{
												row.VolatilityMeasure
											}
										</TableCell>
										<TableCell>
											{
												row.AssessmentDate
											}
										</TableCell>
										<TableCell>
											{
												row.FundID
											}
										</TableCell>
										<TableCell>
											<Button
												variant="outlined"
												color="error"
												onClick={() =>
													handleDelete(
														row.AssessmentID
													)
												}
											>
												Delete
											</Button>
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

export default Analytics;
