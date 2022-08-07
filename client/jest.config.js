module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleDirectories: ["node_modules", "src"],
	transform: {
		"node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
	},
	transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
};
