import { prettyDOM, render } from "../../../helpers/test/render-utils";
import { WEIGHT_UNITS, WorkoutWithExercises } from "../../../types/shared/exercise.types";
import WorkoutCard from "./WorkoutCard";

const workoutWithoutExercises: WorkoutWithExercises = {
	name: "Workout name",
	user_id: 1,
	workout_id: 1,
	description: "This doesn't have a description.. or does it?",
	exercises: [],
};

describe("WorkoutCard", () => {
	test("doesn't render anything if workout doesn't have exercises", () => {
		const { container } = render(<WorkoutCard workout={workoutWithoutExercises} />);
		expect(container).toBeEmptyDOMElement();
	});

	test("renders card with name and exercises", () => {
		const workoutWithExercises = {
			...workoutWithoutExercises,
			exercises: [
				{
					exercise_id: 1,
					exercise_name: "Squat",
					reps: 5,
					sets: 3,
					starting_weight: 60,
					weight_progression: 2.5,
					weight_unit: WEIGHT_UNITS.KG,
					workout_id: 1,
				},
			],
		};

		const { container } = render(<WorkoutCard workout={workoutWithExercises} />);

		expect(prettyDOM(container)).toMatchInlineSnapshot(`
		"[36m<div>[39m
		  [36m<li[39m
		    [33mclass[39m=[32m\\"sc-bczRLJ bZeXtS\\"[39m
		  [36m>[39m
		    [36m<h1[39m
		      [33mclass[39m=[32m\\"sc-gsnTZi dxiesM\\"[39m
		    [36m>[39m
		      [0mWorkout name[0m
		    [36m</h1>[39m
		    [36m<ul[39m
		      [33mclass[39m=[32m\\"sc-hKMtZM drSinE\\"[39m
		    [36m>[39m
		      [36m<li[39m
		        [33mclass[39m=[32m\\"sc-dkzDqf iBQvjv\\"[39m
		      [36m>[39m
		        [0mSquat[0m
		      [36m</li>[39m
		    [36m</ul>[39m
		  [36m</li>[39m
		[36m</div>[39m"
	`);
	});
});
