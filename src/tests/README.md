# Testing Guide

This directory contains integration tests for the application using Vitest with browser mode support. The testing approach focuses on testing full features and user interactions rather than isolated units.

## Test Structure

- `setup.ts`: Contains test environment configuration, environment variables, and MSW server setup
- `interceptors/`: Contains helpers for mocking API requests without mocking modules
- `*.test.tsx`: Individual test files for various features

## Running Tests

- `pnpm test`: Run all tests once
- `pnpm test:watch`: Run tests in watch mode with auto-reloading
- `pnpm test:ui`: Run tests with the Vitest UI for visualization
- `pnpm test:browser`: Run tests specifically in browser mode for realistic interactions

## Testing Philosophy

Our approach:

1. **Real dependencies**: Instead of mocking modules, we intercept network requests to maintain real code paths
2. **Integration focus**: Tests focus on how features work together rather than isolated units
3. **Browser testing**: Uses Vitest browser mode to test realistic browser interactions
4. **Minimal mocking**: Only mock what's necessary (primarily API responses)

## Adding New Tests

When creating new tests:

1. Create a new `feature-name.test.tsx` file
2. Use the ServerComponentWrapper for testing Server Components
3. Use interceptors for mocking API responses
4. Focus on user journeys and interactions 