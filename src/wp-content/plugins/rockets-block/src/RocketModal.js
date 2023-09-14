import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
	faHouse,
	faCheck,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { __, sprintf } from "@wordpress/i18n";

const RocketModal = ({ show, onClose, rocket }) => {
	if (!show) return null;

	return (
		<>
			<div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center shadow-lg">
				<div className="flex flex-col relative bg-gray-300 p-7 rounded-md max-w-md overflow-y-scroll">
					<FontAwesomeIcon
						className="absolute right-5 top-5 cursor-pointer text-xl"
						icon={faXmark}
						onClick={onClose}
					/>
					<div className="flex flex-row items-center justify-center relative border-b-2 mb-3 border-b-gray-700 w-full">
						<p className="text-lg font-semibold mb-3">{rocket.name}</p>
					</div>
					<div className="flex flex-row gap-1">
						<p>{__("Active", "rockets-block")}:</p>
						<p
							className={`${
								rocket.active === false ? "text-red-500" : "text-green-600"
							} font-semibold`}
						>
							{rocket.active === false ? "No" : "Yes"}
						</p>
					</div>
					<div className="flex flex-row gap-1">
						<p className="font-semibold">{__("Company", "rockets-block")}:</p>
						<p>{rocket.company}</p>
					</div>
					<div className="flex flex-row gap-1">
						<p className="font-semibold">{__("Country", "rockets-block")}:</p>
						<p>{rocket.country}</p>
					</div>
					<div className="flex flex-row gap-1">
						<p className="font-semibold">{rocket.boosters}</p>
						<p>{__("boosters", "rockets-block")}</p>
					</div>
					<div className="flex flex-row gap-1">
						<p>{__("Cost per launch", "rockets-block")}: </p>
						<p className="font-semibold">
							${rocket.cost_per_launch.toLocaleString("en-US")} USD
						</p>
					</div>
					<p className="font-semibold text-md">
						{__("Description", "rockets-block")}:
					</p>
					<p className="text-md">{rocket.description}</p>
					<div className="flex-column">
						<p className="font-semibold">{__("Diameter", "rockets-block")}:</p>
						<p>
							{rocket.diameter.feet} {__("feet", "rockets-block")}
						</p>
						<p>
							{rocket.diameter.meters} {__("meters", "rockets-block")}
						</p>
					</div>
					<div className="flex flex-row gap-1">
						<p className="font-semibold">Height:</p>
						<p>{rocket.height.meters} meters</p>
					</div>
					<div className="flex flex-row gap-1">
						<p className="font-semibold">Weight:</p>
						<p>{rocket.mass.kg} kilograms</p>
					</div>
					<div className="flex flex-row gap-1">
						<p className="font-semibold">Engine layout:</p>
						<p>{rocket.engines.layout}</p>
					</div>
					<div className="flex flex-row gap-1">
						<p>{rocket.success_rate_pct}%</p>
						<p className="font-semibold">success rate</p>
					</div>
					<div className="flex flex-row gap-1">
						<p className="font-semibold">Stages:</p>
						<p>{rocket.stages}</p>
					</div>
					<div className="flex flex-row gap-1">
						<p className="font-semibold">First flight was in:</p>
						<p>{rocket.first_flight}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default RocketModal;
