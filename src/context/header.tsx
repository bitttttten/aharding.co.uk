"use client"

import React from "react"
import invariant from "tiny-invariant"

const HeaderContext = React.createContext<{
	hover: string | null
	setHover: (hover: string | null) => void
} | null>(null)

export function HeaderContextProvider({
	children,
}: { children: React.ReactNode }) {
	const [hover, setHover] = React.useState<string | null>(null)

	return (
		<HeaderContext.Provider value={{ hover, setHover }}>
			{children}
		</HeaderContext.Provider>
	)
}

export function useHeaderContext() {
	const context = React.useContext(HeaderContext)
	invariant(
		context,
		"useHeaderContext must be used within a HeaderContext.Provider",
	)
	return context
}
