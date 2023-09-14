import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import RocketCard from "../RocketCard";

test("rocket card is being passed a rocket object with the necessary props", () => {
	const rocket = {
		active: true,
		name: "MyRocket55",
		boosters: 15,
		company: "randomCompany",
		country: "Germany",
		description: "This is my rocket's description",
		cost_per_launch: 15550055,
		flickr_images: [
			"https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg",
		],
		engines: {
			layout: "The rocket's layout.",
		},
		diameter: {
			meters: 51,
			feet: 167,
		},
		mass: {
			kg: 9999,
			lb: 32805,
		},
		success_rate_pct: 89,
		stages: 15,
		first_flight: "2023-09-14",
	};
	render(<RocketCard rocket={rocket} />);

	// Assert that the component renders with the correct data
	const rocketNameElement = screen.getByText(rocket.name);
	// Find an element with the real DOM id 'rockets-grid'
});
