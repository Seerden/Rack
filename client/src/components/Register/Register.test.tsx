import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Register from "./Register";

describe("Register", () => {
	test("renders input fields", () => {
		render(<Register />);

		expect(screen.getAllByRole("textbox")).toHaveLength(1); // user field
		expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Repeat password/)).toBeInTheDocument();
	});

	test("renders submit button as disabled by default", () => {
		render(<Register />);

		const btn = screen.getByText("Fill in all fields");
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveAttribute("disabled", "");
	});

	test("submit button becomes enabled once fields are filled in", () => {
		render(<Register />);

		const usernameInput = screen.getByLabelText(/Username/);
		fireEvent.change(usernameInput, { target: { value: "Billy" } });

		const passwordInput = screen.getByLabelText(/Password/);
		fireEvent.change(passwordInput, { target: { value: "hunter2" } });

		const rePasswordInput = screen.getByLabelText(/Repeat password/);
		fireEvent.change(rePasswordInput, { target: { value: "hunter2" } });

		expect(screen.getByText("Register")).toBeInTheDocument();
	});
});
