const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/images/(.*)$': '<rootDir>/src/images/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/server/(.*)$': '<rootDir>/src/server/$1',
    '^@/stores/(.*)$': '<rootDir>/src/stores/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/calculator/(.*)$': '<rootDir>/src/features/calculator/$1',
    '^@/deposit/(.*)$': '<rootDir>/src/features/deposit/$1',
    '^@/icons/(.*)$': '<rootDir>/src/components/Icons/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
