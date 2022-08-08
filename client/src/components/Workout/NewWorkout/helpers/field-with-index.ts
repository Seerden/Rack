function stringWithIndex(s: string, index: number) {
	return `${s}-${index}`;
}

export function stringWithIndexFunctor(index: number) {
	return (s: string) => stringWithIndex(s, index);
}
