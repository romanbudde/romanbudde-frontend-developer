import domReady from "@wordpress/dom-ready";
import { render } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import RocketCard from "./RocketCard";
import React, { useState, useEffect } from "react";
import Paginate from "./Paginate";
import Select from "react-select";
import moment from "moment";

const App = () => {
	const [rockets, setRockets] = useState([]);
	const [displayedRockets, setDisplayedRockets] = useState([]);
	const [dateFilter, setDateFilter] = useState("newest");
	const [statusFilter, setStatusFilter] = useState("all");
	const [userLoggedIn, setUserLoggedIn] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(2);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = displayedRockets.slice(
		indexOfFirstPost,
		indexOfLastPost,
	);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const optionsLaunchDate = [
		{ value: "newest", label: "Newest" },
		{ value: "oldest", label: "Oldest" },
	];

	const optionsStatus = [
		{ value: "active", label: "Active" },
		{ value: "inactive", label: "Inactive" },
		{ value: "all", label: "All" },
	];

	const handleDateFilterChange = (e) => {
		setDateFilter(e.value);
		sortRockets(e.value, "");
		setCurrentPage(1);
	};

	const handleStatusFilterChange = (e) => {
		setStatusFilter(e.value);
		sortRockets("", e.value);
		setCurrentPage(1);
	};

	const sortRockets = (date, status) => {
		console.log("dateFilter: ", date);
		console.log("statusFilter: ", status);

		let rocketsFiltered = [];

		if (status !== "") {
			if (dateFilter === "newest") {
				rocketsFiltered = sortRocketsByNewest(rocketsFiltered);
			}
			if (dateFilter === "oldest") {
				rocketsFiltered = sortRocketsByOldest(rocketsFiltered);
			}

			if (status === "active") {
				rocketsFiltered = sortRocketsByActive(rocketsFiltered);
			}
			if (status === "inactive") {
				rocketsFiltered = sortRocketsByInactive(rocketsFiltered);
			}
			if (status === "all") {
				rocketsFiltered = sortRocketsByAll(rocketsFiltered);
			}
		}

		if (date !== "") {
			if (date === "newest") {
				rocketsFiltered = sortRocketsByNewest(rocketsFiltered);
			}
			if (date === "oldest") {
				rocketsFiltered = sortRocketsByOldest(rocketsFiltered);
			}

			if (statusFilter === "active") {
				rocketsFiltered = sortRocketsByActive(rocketsFiltered);
			}
			if (statusFilter === "inactive") {
				rocketsFiltered = sortRocketsByInactive(rocketsFiltered);
			}
			if (statusFilter === "all") {
				rocketsFiltered = sortRocketsByAll(rocketsFiltered);
			}
		}

		setDisplayedRockets(rocketsFiltered);
	};

	const sortRocketsByActive = (rocketsFiltered) => {
		console.log("sortrocketsByActive");

		rocketsFiltered = rocketsFiltered.filter((rocket) => rocket.active);

		console.log("by active rockets: ", rocketsFiltered);

		return rocketsFiltered;
	};

	const sortRocketsByInactive = (rocketsFiltered) => {
		console.log("sortrocketsByInactive");
		console.log("rockets filtered: ", rocketsFiltered);

		rocketsFiltered = rocketsFiltered.filter((rocket) => !rocket.active);

		console.log("by inactive rockets: ", rocketsFiltered);

		return rocketsFiltered;
	};

	const sortRocketsByAll = (rocketsFiltered) => {
		console.log("sortrocketsByAll");

		console.log("by all rockets: ", rocketsFiltered);

		return rocketsFiltered;
	};

	const sortRocketsByOldest = () => {
		console.log("sortrocketsByOldest");

		setDateFilter("oldest");

		let sortedArray = [...rockets];

		sortedArray.sort((a, b) => {
			const dateA = moment(a.first_flight, "YYYY-MM-DD");
			const dateB = moment(b.first_flight, "YYYY-MM-DD");
			return dateA.diff(dateB);
		});

		// setDisplayedRockets(sortedArray);

		console.log("by oldest rockets: ", sortedArray);

		return sortedArray;
	};

	const sortRocketsByNewest = () => {
		console.log("sortrocketsByNewest");

		setDateFilter("newest");

		let sortedArray = [...rockets];

		sortedArray.sort((a, b) => {
			const dateA = moment(a.first_flight, "YYYY-MM-DD");
			const dateB = moment(b.first_flight, "YYYY-MM-DD");
			return dateB.diff(dateA);
		});

		console.log("by newest rockets: ", sortedArray);

		return sortedArray;
	};

	const getRocketsData = () => {
		console.log("get rockets data");
		// apiFetch( { path: '/wp-json/custom-plugin/v1/spacex-rockets' } ).then( ( rockets ) => {
		try {
			apiFetch({
				url: "http://localhost/wp-json/custom-plugin/v1/spacex-rockets",
			})
				.then((rocketsData) => {
					console.log("fetched rockets data: ", rocketsData);
					console.log("rocketsData.length > 0 ?: ", rocketsData.length > 0);
					if (rocketsData.length > 0) {
						setRockets(rocketsData);
						setDisplayedRockets(rocketsData);
						console.log("setRockets executed.");
						// setAttributes({ data: rocketsData });
						// console.log('setAttributes executed.');
					}
				})
				.catch((error) => {
					console.log("There has been an error: ", error);
					if (error.data.status === 401) {
						console.log("Unauthorized access. Login is needed.");
						setUserLoggedIn(false);
					}
				});
		} catch (error) {
			// console.log('------------- error -------------');
			// console.log('error on fetching data: ', error);
		}
	};

	useEffect(() => {
		getRocketsData();
	}, []);

	return (
		<div>
			React app
			<div className="flex flex-row">
				<Select
					// value={selectedHoraDesde}
					onChange={(e) => handleDateFilterChange(e)}
					placeholder={"Launch date:"}
					options={optionsLaunchDate}
					isSearchable={false}
					maxMenuHeight={240}
					className="rounded-md m-5 w-1/2"
					theme={(theme) => ({
						...theme,
						borderRadius: 10,
						colors: {
							...theme.colors,
							primary25: "#8FD5FF",
							primary: "black",
						},
					})}
				/>
				<Select
					// value={selectedHoraDesde}
					onChange={(e) => handleStatusFilterChange(e)}
					placeholder={"Status:"}
					isSearchable={false}
					options={optionsStatus}
					maxMenuHeight={240}
					className="rounded-md m-5 w-1/2"
					theme={(theme) => ({
						...theme,
						borderRadius: 10,
						colors: {
							...theme.colors,
							primary25: "#8FD5FF",
							primary: "black",
						},
					})}
				/>
			</div>
			<Paginate
				postsPerPage={postsPerPage}
				totalPosts={displayedRockets.length}
				paginate={paginate}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
			{currentPosts.length > 0 ? (
				<div className="grid grid-cols-2 gap-5">
					{currentPosts.map((rocket) => (
						<div className="my-5" key={rocket.id}>
							<RocketCard rocket={rocket} />
						</div>
					))}
				</div>
			) : userLoggedIn ? (
				<p>Loading rockets data, please wait...</p>
			) : (
				<p>
					Unauthorized access to rockets data, please log in to your account.
				</p>
			)}
		</div>
	);
};

domReady(function () {
	// alert('dom ready');
	const container = document.querySelector("#app");
	render(<App />, container);
});
