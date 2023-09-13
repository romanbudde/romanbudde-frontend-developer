import React, { Fragment, useState, useEffect } from "react";
import RocketModal from "./RocketModal";
// import MoonLoader from "react-spinners/ClipLoader";

const RocketCard = ({ rocket }) => {
	console.log("inside rocket card - rocket: ", rocket.name);

	const [showEditModal, setShowEditModal] = useState(false);

	const handleShow = () => setShowEditModal(true);
	const handleClose = () => {
		console.log("----------- HANDLE CLOSE() -----------");
		setShowEditModal(false);
	};

	return (
		<>
			<div
				className="bg-gradient-to-b from-gray-300 to-gray-100 p-5 rounded-md shadow-md cursor-pointer hover:scale-105 transition"
				onClick={handleShow}
			>
				<p className="text-lg font-semibold mb-5">{rocket.name}</p>
				<img src={rocket.flickr_images[0]}></img>
				<button className="show-rocket-info-btn text-sm text-gray-600">
					Show more info
				</button>
			</div>
			<RocketModal show={showEditModal} onClose={handleClose} rocket={rocket} />
		</>
	);
};

export default RocketCard;
