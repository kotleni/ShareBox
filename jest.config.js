// jest.config.js
const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
// We need to read the tsconfig.json file
const { compilerOptions } = require('./tsconfig');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {

  // Use the helper to automatically create the mapper
  // It reads the "paths" from tsconfig.json and converts them to Jest's format
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

module.exports = createJestConfig(customJestConfig);