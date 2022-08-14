import { fireEvent, render, screen } from "../../helpers/test/render-utils";
import Login from "./Login";

describe("Login form", () => {
	test("renders input fields", () => {
		render(<Login />);

		expect(screen.getAllByRole("textbox")).toHaveLength(1); // username field
		expect(screen.getByLabelText(/Password/)).toBeInTheDocument(); // password field
	});

	describe("log in button", () => {
		test("starts out as disabled", () => {
			render(<Login />);

			const button = screen.getByRole("button");
			expect(button).toHaveAttribute("disabled");
		});

		test("becomes enabled once fields are filled in", () => {
			render(<Login />);

			const usernameInput = screen.getByRole("textbox");
			const passwordInput = screen.getByLabelText(/Password/);

			fireEvent.change(usernameInput, { target: { value: "Bob" } });
			fireEvent.change(passwordInput, { target: { value: "hunter2" } });

			const logInButton = screen.getByRole("button");
			expect(logInButton).toHaveTextContent(/Log in/);
			expect(logInButton).toBeInTheDocument();
			expect(logInButton).not.toHaveAttribute("disabled", true);
		});
	});

	describe("toggle password visibility", () => {
		// TODO: Not yet implemented
	});
});
