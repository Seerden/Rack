describe("NewWorkout", () => {
	describe("renders properly", () => {
		describe("renders form with initial empty exercise", () => {});

		describe("renders new exercise on interaction, and collapses all others", () => {});
	});

	describe("validates form in realtime", () => {
		/**
		 * This is tied into functionality of useNewWorkout.
		 * - the hook tests isValidNewWorkout and returns something like
		 *   `isValidWorkout`, which is computed off newWorkout state
		 * - the client takes `isValidWorkout` and conditionally disables the
		 *   `save new workout` submit button
		 *
		 * - need a valid form state and an invalid form state to test this
		 */
	});
});
