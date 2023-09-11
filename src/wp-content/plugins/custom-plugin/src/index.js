import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import apiFetch from '@wordpress/api-fetch';
import RocketCard from './RocketCard';

wp.blocks.registerBlockType("custom-plugin/my-own-gutenberg-block", {
	title: "Custom own Gutenberg Block",
	icon: "smiley",
	category: "common",
	attributes: {},
	edit: function (props) {

		const [rockets, setRockets] = useState([]);
		const { attributes, setAttributes } = props;

		const getRocketsData = () => {
			console.log('get rockets data');
			// apiFetch( { path: '/wp-json/custom-plugin/v1/spacex-rockets' } ).then( ( rockets ) => {
			apiFetch( { url: 'http://localhost/wp-json/custom-plugin/v1/spacex-rockets' } ).then( ( rocketsData ) => {
				console.log( 'fetched rockets data: ', rocketsData );
				if (rocketsData.length > 0) {
					setRockets(rocketsData);
					setAttributes({ data: rocketsData });
					console.log('saves attributes with rocketsData');
				}
			} );
		}

		useEffect(() => {
			getRocketsData();
		}, []);

		if(!rockets.length > 0) {
			return (
				<div>
					<p>Loading rockets data...</p>
				</div>
			)
		}

		console.log('rockets length: ', rockets.length);

		return (
			<div>
				<h3 className="">This is a JSX h3 asd</h3>
				<button className="">Bootstrap Buttonn</button>
				<p>This is a paragraph - JSX 1</p>
				{rockets.length > 0 && (
					<ul>
						{rockets.map(rocket => (
							<div>
								<li>
									<RocketCard 
										rocket = {rocket}
									/>
								</li>
							</div>
						))}
					</ul>
				)}
			</div>
		);
	},
	save: function (props) {
		const { attributes } = props;
		const { data } = attributes;
		// const [rockets, setRockets] = useState();
		console.log('props: ', props);
		console.log('attributes: ', attributes);
		console.log('data: ', data);

		// Check data has been fetched
		if (!data) {
			return <div>Loading...</div>;
		}

	
		// Use the fetched data to render the rockets
		return (
			<div>
				<h5>List of Rockets</h5>
				{data.length > 0 && data.map(rocket => (
					<div>
						<h5>{rocket && rocket.name}</h5>
						<RocketCard 
							rocket = {rocket}
						/>
					</div>
				))}
			</div>
		);
	}
});