import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Joke from "../joke";

test("Joke component receives props and then renders text", () => {
	// Renders Joke component with some tex prop.
	const { getByTestId } = render(
		<Joke text="The funniest joke this year." />
	);

	// Expects Joke component to render correct text.
	expect(getByTestId("joke-text")).toHaveTextContent(
		"The funniest joke this year."
	);
});
