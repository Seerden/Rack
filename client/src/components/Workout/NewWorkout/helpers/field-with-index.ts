/** Append `index` to a string
 *
 * @usage Forms with multiple rows of the same thing (e.g. NewWorkout, which
 * contains multiple NewExercise input combinations) need each entry (e.g.
 * NewExercise) to have its own id/name/htmlFor combinations. One way to achieve
 * this is by associating an index with every entry.
 */
function stringWithIndex(s: string, index: number) {
	return `${s}-${index}`;
}

/** Create a `stringWithIndex` function with pre-specified `index` parameter. */
export function stringWithIndexFunctor(index: number) {
	return (s: string) => stringWithIndex(s, index);
}

/** Split a field like `exercise-1` into ['exercise', 1] */
export function splitNameAndIndex(s: string) {
	const [name, index] = s.split("-");

	return [name, +index] as const;
}
