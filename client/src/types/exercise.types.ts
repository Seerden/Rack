export type WeightUnit = "kg" | "lbs";

export type NewExercise = {
	exercise: string;
	starting_weight: number;
	weight_unit: WeightUnit;
	sets: number;
	reps: number;
	weight_progression: number;
};

export type NewWorkout = {
	name: string;
	description?: string; // TODO: not-yet-implemented
	tags?: Array<string>; // TODO: not-yet-implemented
	exercises: NewExercise[];
};

export function isValidNewWorkout(newWorkout: NewWorkout): newWorkout is NewWorkout {
	const { name = "", description = "", tags = [], exercises = [] } = newWorkout;

	return (
		// TODO: description and tags aren't implemented, so we're not validating
		// them yet.
		typeof name === "string" &&
		!!name?.length &&
		Array.isArray(exercises) &&
		!!exercises.length
	);
}
