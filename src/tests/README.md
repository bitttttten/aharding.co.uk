# Testing Guide

This application uses Vitest for testing with a focus on integration testing. Test files are co-located with the components they test.

## Test Structure

- `src/tests/setup.ts`: Contains test environment configuration, environment variables, and MSW server setup
- `src/tests/mocks/`: Contains helpers for mocking API requests without mocking modules
- `src/tests/utils.tsx`: Contains shared utilities for testing like the ServerComponentWrapper
- `**/*.test.tsx`: Component tests are located next to the components they test

## Running Tests

- `pnpm test`: Run all tests once
- `pnpm test:watch`: Run tests in watch mode with auto-reloading
- `pnpm test:ui`: Run tests with the Vitest UI for visualization
- `pnpm test:basic`: Run tests with Node directly using experimental VM modules

## Testing Philosophy

Our approach:

1. **Co-location**: Test files are placed next to the files they test
2. **Real dependencies**: Instead of mocking modules, we intercept network requests to maintain real code paths
3. **Integration focus**: Tests focus on how features work together rather than isolated units
4. **Minimal mocking**: Only mock what's necessary (primarily API responses)

## Adding New Tests

When creating new tests:

1. Create a new `component-name.test.tsx` file next to the component
2. Use the ServerComponentWrapper for testing Server Components
3. Use mocks for mocking API responses
4. Focus on user journeys and interactions 