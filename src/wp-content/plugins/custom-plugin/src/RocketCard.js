import React, { Fragment, useState, useEffect } from 'react';
import RocketModal from './RocketModal';
import "../css/style.css"
// import MoonLoader from "react-spinners/ClipLoader";

const RocketCard = ({ rocket }) => {
	
	console.log('inside rocket card - rocket: ', rocket.name);

    const [showEditModal, setShowEditModal] = useState(false);

    const handleShow = () => setShowEditModal(true);
    const handleClose = () => {
        console.log('----------- HANDLE CLOSE() -----------');
        setShowEditModal(false);
    }

    return (
        <>
           <div>
				<h4>ROCKET CARD</h4>
				<button
					className='show-rocket-info-btn'
					onClick={handleShow}
				>
					A button that does something
				</button>
				<p>
					{rocket.name}
				</p>
				<RocketModal
					show={showEditModal}
					onClose={handleClose}
				/>
            </div>
        </>
    )
}

export default RocketCard;