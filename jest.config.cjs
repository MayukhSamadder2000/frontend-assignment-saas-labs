module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"], // If you're using a setup file for mocks or configuration
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Transform JS/JSX files using babel-jest
  },
};
