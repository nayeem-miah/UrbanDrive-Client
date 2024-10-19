module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // For handling CSS modules
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
