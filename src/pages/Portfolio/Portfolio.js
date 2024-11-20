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
} from "@mui/material";

function Portfolio() {
	const [portfolioData, setPortfolioData] = useState([]);

	useEffect(() => {
		fetchPortfolioData();
	}, []);

	const fetchPortfolioData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/portfolios"
			);
			const data = await response.json();
			setPortfolioData(data.data); // Assuming data is in data.data
		} catch (error) {
			console.error("Error fetching Portfolio data:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" align="center" gutterBottom>
				Portfolio
			</Typography>

			{/* Portfolio Table */}
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6" gutterBottom>
					Portfolio Table
				</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									Portfolio
									Name
								</TableCell>
								<TableCell>
									User ID
								</TableCell>
								<TableCell>
									Total
									Value
								</TableCell>
								<TableCell>
									Creation
									Date
								</TableCell>
								<TableCell>
									Currency
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{portfolioData.map(
								(row) => (
									<TableRow
										key={
											row.PortfolioID
										}
									>
										{" "}
										{/* Assuming each portfolio has a unique PortfolioID */}
										<TableCell>
											{
												row.PortfolioName
											}
										</TableCell>
										<TableCell>
											{
												row.UserID
											}
										</TableCell>
										<TableCell>
											{
												row.TotalValue
											}
										</TableCell>
										<TableCell>
											{new Date(
												row.CreationDate
											).toLocaleDateString()}
										</TableCell>{" "}
										{/* Format the creation date */}
										<TableCell>
											{
												row.Currency
											}
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

export default Portfolio;
