import React from "react";
import { render, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import JokeGenerator from "../jokeGenerator";
import * as axios from "axios";
import MockAxios from "axios-mock-adapter";

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

afterAll(() => mock.restore());

test("'JokeGenerator' component fetches a random joke and renders it", async () => {
	mock.onGet().replyOnce(200, {
		value: {
			joke: "Really funny joke!"
		}
	});

	// Rendering JokeGenerator component
	const { getByText, queryByText, queryByTestId } = render(<JokeGenerator />);

	/**
	 * Checking if a default text is being displayed when
	 * no joke has been loaded yet.
	 */
	expect(getByText("You haven't loaded any joke yet!")).toBeInTheDocument();

	userEvent.click(getByText("Load a random joke"));
	expect(
		queryByText("You haven't loaded any joke yet!")
	).not.toBeInTheDocument();
	expect(queryByText("Loading...")).toBeInTheDocument();

	await wait(() => expect(queryByText("Loading...")).not.toBeInTheDocument());
	expect(queryByTestId("joke-text")).toBeInTheDocument();
});
