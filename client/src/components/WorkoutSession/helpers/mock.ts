import { ActiveWorkout } from "../types/workout-state.types";

export const defaultActiveWorkout: ActiveWorkout = [
	{
		exercise_id: 2,
		session: [
			{
				weight: 60,
				weight_unit: "kg",
				sets: 3,
				reps: 5,
			},
		],
	},
	{
		exercise_id: 3,
		session: [
			{
				weight: 100,
				weight_unit: "kg",

				sets: 1,
				reps: 5,
			},
		],
	},
];
