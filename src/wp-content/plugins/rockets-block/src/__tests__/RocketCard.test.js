import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import RocketCard from "../RocketCard";

test("rocket card is being passed a proper rocket", () => {
	const rocket = {
		active: true,
		name: "MyRocket55",
		boosters: 15,
		company: "randomCompany",
	};
	render(<RocketCard rocket={rocket} />);

	// Assert that the component renders with the correct data
	const rocketNameElement = screen.getByText(rocket.name);
	expect(rocketNameElement).toBeInTheDocument();
});
