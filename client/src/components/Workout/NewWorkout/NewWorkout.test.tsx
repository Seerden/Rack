import { setupServer } from "msw/lib/node";
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "../../../helpers/test/render-utils";
import NewWorkout from "./NewWorkout";

const server = setupServer();
const requestSpy = jest.fn();
server.events.on("request:start", requestSpy);
beforeAll(() => {
	server.listen();
});

afterAll(() => {
	server.close();
});

describe("NewWorkout", () => {
	describe("renders properly", () => {
		it("renders form with initial empty exercise", () => {
			const { container } = render(<NewWorkout />);

			expect(container.querySelectorAll("[data-collapsed=true]")).toHaveLength(0);
			expect(screen.getAllByLabelText(/Exercise/)).toHaveLength(1);
			expect(screen.getByTitle(/Delete this exercise/)).not.toBeVisible();

			const submitButton = screen.getByText(/Fill out all fields/);
			expect(submitButton).toBeInTheDocument();
			expect(submitButton).toBeDisabled();
		});

		it("renders functional additional exercise on button interaction", () => {
			const { container } = render(<NewWorkout />);

			const addButton = screen.getByText(/Add another exercise/);
			act(() => {
				waitFor(() => {
					fireEvent.click(addButton);
					// second exercise is rendered and the first one is collapsed
					const [first, second] = container.querySelectorAll("fieldset");
					expect(first).toHaveAttribute("[data-collapsed]", true);
					expect(second).toHaveAttribute("[data-collapsed]", false);
					expect(screen.getByTitle(/Delete this exercise/)).toBeVisible();
				});

				// Deletes exercise on interaction?
				waitFor(() => {
					const deleteButton = screen.getByTitle(/Delete this exercise/);
					fireEvent.click(deleteButton);
					expect(container.querySelectorAll("fieldset")).toHaveLength(1);
				});
			});
		});
	});

	describe("form is validated", () => {
		it("form becomes submittable after inputs are filled out", async () => {
			const spy = jest.spyOn(global, "fetch");
			const { container } = render(<NewWorkout />);

			const inputs = container.querySelectorAll("input");
			act(() => {
				for (const input of inputs) {
					fireEvent.change(input, { target: { value: "12" } });
				}

				for (const input of inputs) {
					expect(["12", 12]).toContain(input.value);
				}
			});

			const saveButton = screen.getByText(/Save new workout/);
			expect(saveButton).toBeInTheDocument();
			fireEvent.click(saveButton);
			await waitFor(() => {
				// We might want to go deeper into the routing and form submission,
				// but I'm fine with just checking if the POST endpoint is called,
				// for now.
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
	});
});
