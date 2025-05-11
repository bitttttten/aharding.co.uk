import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react"
import dotenv from "dotenv"
import { afterAll, afterEach, beforeAll, vi } from "vitest"
import { server } from "./server"

dotenv.config({ path: [".env.test", ".env.local", ".env"] })

afterEach(() => {
	cleanup()
})

beforeAll(() =>
	server.listen({
		onUnhandledRequest: "error",
	}),
)
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

vi.mock("server-only", () => {
	return {}
})
