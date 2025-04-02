import type { Config } from "jest";
import nextJest from "next/jest.js";

const nextJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default nextJestConfig(config);
