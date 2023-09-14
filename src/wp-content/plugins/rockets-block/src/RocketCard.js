import React, { Fragment, useState, useEffect } from "react";
import RocketModal from "./RocketModal";

const RocketCard = ({ rocket }) => {
	const [showEditModal, setShowEditModal] = useState(false);

	const handleShow = () => setShowEditModal(true);
	const handleClose = () => {
		setShowEditModal(false);
	};

	return (
		<>
			<div
				className="bg-gradient-to-b from-gray-300 to-gray-100 p-5 rounded-md shadow-md cursor-pointer hover:scale-105 transition rocket-card"
				onClick={handleShow}
			>
				<p className="text-lg font-semibold mb-5">{rocket.name}</p>
				{rocket.flickr_images[0] ? (
					<img src={rocket.flickr_images[0]}></img>
				) : (
					<p className="text-sm">Sorry! No image available for this rocket.</p>
				)}
				<button className="show-rocket-info-btn text-sm text-gray-600">
					Show more info
				</button>
			</div>
			<RocketModal show={showEditModal} onClose={handleClose} rocket={rocket} />
		</>
	);
};

export default RocketCard;
