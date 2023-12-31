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
		rocketsFiltered = rocketsFiltered.filter((rocket) => rocket.active);

		return rocketsFiltered;
	};

	const sortRocketsByInactive = (rocketsFiltered) => {
		rocketsFiltered = rocketsFiltered.filter((rocket) => !rocket.active);

		return rocketsFiltered;
	};

	const sortRocketsByAll = (rocketsFiltered) => {
		return rocketsFiltered;
	};

	const sortRocketsByOldest = () => {
		setDateFilter("oldest");

		let sortedArray = [...rockets];

		sortedArray.sort((a, b) => {
			const dateA = moment(a.first_flight, "YYYY-MM-DD");
			const dateB = moment(b.first_flight, "YYYY-MM-DD");
			return dateA.diff(dateB);
		});

		return sortedArray;
	};

	const sortRocketsByNewest = () => {
		setDateFilter("newest");

		let sortedArray = [...rockets];

		sortedArray.sort((a, b) => {
			const dateA = moment(a.first_flight, "YYYY-MM-DD");
			const dateB = moment(b.first_flight, "YYYY-MM-DD");
			return dateB.diff(dateA);
		});

		return sortedArray;
	};

	const getRocketsData = () => {
		apiFetch({
			url: "http://localhost/wp-json/custom-plugin/v1/spacex-rockets",
		})
			.then((rocketsData) => {
				if (rocketsData.length > 0) {
					setRockets(rocketsData);
					setDisplayedRockets(rocketsData);
				}
			})
			.catch((error) => {
				if (error.data.status === 401) {
					setUserLoggedIn(false);
				}
			});
	};

	useEffect(() => {
		getRocketsData();
	}, []);

	return (
		<div>
			<div className="flex flex-row">
				<Select
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
				<div className="grid grid-cols-2 gap-5" id="rockets-grid">
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
