import React, { Fragment, useState, useEffect } from 'react';
// import MoonLoader from "react-spinners/ClipLoader";

const RocketModal = ({ show, onClose }) => {
	
	console.log('inside rocket modal');

    // const [showEditModal, setShowEditModal] = useState(false);


	if(!show) return null;

    return (
        <>
           <div className=''>
				<h4>MODALLLL</h4>
				<button
					onClick={onClose}
				>
					X
				</button>
				<p>asdasdasd</p>
				<p>asdasdasd 2</p>
				<p>asdasdasd 3</p>
				<p>asdasdasd 4</p>
            </div>
        </>
    )
}

export default RocketModal;