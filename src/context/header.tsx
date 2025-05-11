"use client"

import React from "react"
import invariant from "tiny-invariant"

const HeaderContext = React.createContext<{
	hover: string | null
	setHover: (hover: string | null) => void
} | null>(null)

export function HeaderContextProvider({
	children,
	hover: hoverFromProps,
	setHover: setHoverFromProps,
}: {
	children: React.ReactNode
	hover?: string | null
	setHover?: (hover: string | null) => void
}) {
	const [hover, setHover] = React.useState<string | null>(null)

	const isControlled =
		hoverFromProps !== undefined && setHoverFromProps !== undefined

	return (
		<HeaderContext.Provider
			value={{
				hover: isControlled ? hoverFromProps : hover,
				setHover: isControlled ? setHoverFromProps : setHover,
			}}
		>
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
