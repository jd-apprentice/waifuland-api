/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/(unit|integration)/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  coverageReporters: ["text", "lcov", "text", "clover", "cobertura"],
  coverageDirectory: "<rootDir>/.test-results/coverage/",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: ".test-results/unit-testing",
        outputName: "test-results.xml",
      },
    ],
    [
      "jest-html-reporters",
      {
        publicPath: "./.test-results/html-report",
        filename: "report.html",
        openReport: false,
        darkTheme: true,
        inlineSource: true,
      },
    ],
  ],
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 30,
      lines: 60,
      statements: 20,
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
