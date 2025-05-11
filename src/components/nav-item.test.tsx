import { HeaderContextProvider } from "@/context/header"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"
import { NavItem } from "./nav-item"

vi.mock("next/navigation", () => ({
	usePathname: () => "/",
}))

describe("NavItem", () => {
	test("renders link with correct text", () => {
		render(
			<HeaderContextProvider>
				<NavItem href="/test">Test Link</NavItem>
			</HeaderContextProvider>,
		)

		const link = screen.getByText("Test Link")
		expect(link).toBeInTheDocument()
		expect(link.closest("a")).toHaveAttribute("href", "/test")
	})

	test("handles mouse events", async () => {
		const user = userEvent.setup()
		const mockSetHover = vi.fn()

		render(
			<HeaderContextProvider hover={null} setHover={mockSetHover}>
				<NavItem href="/test">Test Link</NavItem>
				<NavItem href="/">Home Link</NavItem>
			</HeaderContextProvider>,
		)

		const homeLink = screen.getByText("Home Link")
		const testLink = screen.getByText("Test Link")

		await user.hover(homeLink)
		expect(mockSetHover).toHaveBeenNthCalledWith(1, "/")

		await user.unhover(homeLink)

		expect(mockSetHover).toHaveBeenNthCalledWith(2, null)

		expect(mockSetHover).toHaveBeenCalledTimes(2)

		// unhover does not fire for test link since it's not the current path.
		// we want to keep the "last focused element" as the "active" one
		await user.hover(testLink)
		await user.unhover(testLink)

		expect(mockSetHover).toHaveBeenNthCalledWith(3, "/test")
		expect(mockSetHover).toHaveBeenCalledTimes(3)
	})
})
