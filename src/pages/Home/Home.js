import React, { useEffect, useState } from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	CircularProgress,
} from "@mui/material";

const Home = () => {
	const [benchmarkData, setBenchmarkData] = useState([]);
	const [allocationData, setAllocationData] = useState([]);
	const [watchlistData, setWatchlistData] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch data for BenchmarkIndex
	const fetchBenchmarkData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/benchmark-index"
			);
			const data = await response.json();
			setBenchmarkData(data.data);
		} catch (error) {
			console.error(
				"Error fetching Benchmark Index data:",
				error
			);
		}
	};

	// Fetch data for AllocationStrategy
	const fetchAllocationData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/allocation-strategy"
			);
			const data = await response.json();
			setAllocationData(data.data);
		} catch (error) {
			console.error(
				"Error fetching Allocation Strategy data:",
				error
			);
		}
	};

	// Fetch data for Watchlist
	const fetchWatchlistData = async () => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/user/watchlist"
			);
			const data = await response.json();
			setWatchlistData(data.data);
		} catch (error) {
			console.error("Error fetching Watchlist data:", error);
		}
	};

	// Fetch all data on component mount
	useEffect(() => {
		const fetchData = async () => {
			await Promise.all([
				fetchBenchmarkData(),
				fetchAllocationData(),
				fetchWatchlistData(),
			]);
			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<Box sx={{ p: 4 }}>
			<Typography
				variant="h4"
				component="h1"
				align="center"
				sx={{ mb: 4 }}
			>
				Home Page
			</Typography>

			{loading ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "50vh",
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<>
					{/* Benchmark Index Table */}
					<Paper sx={{ mb: 4, p: 2 }}>
						<Typography
							variant="h6"
							sx={{ mb: 2 }}
						>
							Benchmark Index
						</Typography>
						<TableContainer
							component={Paper}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>
											Benchmark
											Index
											Name
										</TableCell>
										<TableCell>
											Current
											Value
										</TableCell>
										<TableCell>
											Historical
											Performance
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{benchmarkData.map(
										(
											item
										) => (
											<TableRow
												key={
													item.BenchmarkIndexID
												}
											>
												<TableCell>
													{
														item.BenchmarkIndexName
													}
												</TableCell>
												<TableCell>
													{
														item.CurrentValue
													}
												</TableCell>
												<TableCell>
													{
														item.HistoricalPerformance
													}
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					{/* Allocation Strategy Table */}
					<Paper sx={{ mb: 4, p: 2 }}>
						<Typography
							variant="h6"
							sx={{ mb: 2 }}
						>
							Allocation Strategy
						</Typography>
						<TableContainer
							component={Paper}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>
											Strategy
											Name
										</TableCell>
										<TableCell>
											Rebalancing
											Frequency
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allocationData.map(
										(
											item
										) => (
											<TableRow
												key={
													item.StrategyID
												}
											>
												<TableCell>
													{
														item.StrategyName
													}
												</TableCell>
												<TableCell>
													{
														item.RebalancingFrequency
													}
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					{/* Watchlist Table */}
					<Paper sx={{ mb: 4, p: 2 }}>
						<Typography
							variant="h6"
							sx={{ mb: 2 }}
						>
							Watchlist
						</Typography>
						<TableContainer
							component={Paper}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>
											Watchlist
											Name
										</TableCell>
										<TableCell>
											Watchlist
											Type
										</TableCell>
										<TableCell>
											Last
											Updated
										</TableCell>
										<TableCell>
											User
											ID
										</TableCell>
										<TableCell>
											Asset
											ID
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{watchlistData.map(
										(
											item
										) => (
											<TableRow
												key={
													item.WatchlistID
												}
											>
												<TableCell>
													{
														item.WatchlistName
													}
												</TableCell>
												<TableCell>
													{
														item.WatchlistType
													}
												</TableCell>
												<TableCell>
													{
														item.LastUpdated
													}
												</TableCell>
												<TableCell>
													{
														item.UserID
													}
												</TableCell>
												<TableCell>
													{
														item.AssetID
													}
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</>
			)}
		</Box>
	);
};

export default Home;
