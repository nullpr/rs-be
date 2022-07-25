import { pathsToModuleNameMapper } from "ts-jest";

const { compilerOptions } = require("./tsconfig.paths.json");

export default {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};
