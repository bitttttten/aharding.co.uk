import { expect, afterEach, beforeAll, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project-id'
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'test-dataset'
}

afterEach(() => {
  cleanup()
})

export const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close()) 