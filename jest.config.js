module.exports = {

	clearMocks: true,

	collectCoverage: true,

	coverageDirectory: "coverage",
	 coveragePathIgnorePatterns: [
	   "/node_modules/"
	],
	coverageProvider: "v8",

	transform: {
		'^.+\\.(ts)$': 'ts-jest'
	},
	modulePathIgnorePatterns: [
		'dist',
		'.cache',
		'.tmp',
		'node_modules'
	],
	moduleNameMapper: {
		'@modules/(.*)': '<rootDir>/src/modules/$1',
		'@config/(.*)': '<rootDir>/src/config/$1'
	}

};
