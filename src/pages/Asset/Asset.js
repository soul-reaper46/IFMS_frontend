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

function Asset() {
	const [assetsData, setAssetsData] = useState([]);

	useEffect(() => {
		fetchAssetsData();
	}, []);

	const fetchAssetsData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/assets"
			);
			const data = await response.json();
			setAssetsData(data.data); // Assuming data is in data.data
		} catch (error) {
			console.error("Error fetching Assets data:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" align="center" gutterBottom>
				Assets
			</Typography>

			{/* Assets Table */}
			<Paper sx={{ p: 2 }}>
				<Typography variant="h6" gutterBottom>
					Assets Table
				</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									Asset
									Name
								</TableCell>
								<TableCell>
									Asset
									Type
								</TableCell>
								<TableCell>
									Current
									Value
								</TableCell>
								<TableCell>
									Benchmark
									Index ID
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{assetsData.map(
								(row) => (
									<TableRow
										key={
											row.AssetID
										}
									>
										{" "}
										{/* Assuming each asset has a unique AssetID */}
										<TableCell>
											{
												row.AssetName
											}
										</TableCell>
										<TableCell>
											{
												row.AssetType
											}
										</TableCell>
										<TableCell>
											{
												row.CurrentValue
											}
										</TableCell>
										<TableCell>
											{
												row.BenchmarkIndexID
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

export default Asset;
