const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./server/tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/server/',
  }),
  globals: {
    'ts-jest': {
      tsConfig: 'server/tsconfig.json',
    },
  },
};
