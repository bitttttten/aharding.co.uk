"use client"

import type { ReactNode } from "react"

interface SketchHoverProps {
	aspectRatio: number
	children: ReactNode
	scale?: string
}

export function SketchHover({
	aspectRatio,
	children,
	scale = "2",
}: SketchHoverProps) {
	return (
		<div
			className="group isolate aspect-[var(--aspect)] overflow-hidden"
			style={{
				// @ts-expect-error - Custom CSS variables
				"--aspect": `${aspectRatio}`,
				"--scale": scale,
			}}
			onMouseLeave={(e) => {
				e.preventDefault()
				e.currentTarget.querySelector("div")?.style.setProperty("--x", "0px")
				e.currentTarget.querySelector("div")?.style.setProperty("--y", "0px")
			}}
			onMouseMove={(e) => {
				if (e.currentTarget === e.target) {
					return
				}

				const width = e.currentTarget.clientWidth
				const height = e.currentTarget.clientHeight
				const offsetX = e.nativeEvent.offsetX
				const offsetY = e.nativeEvent.offsetY

				const scale =
					Number.parseInt(e.currentTarget.style.getPropertyValue("--scale")) *
					100

				const x = (offsetX / width) * (scale / 2) - scale / 4
				const y = (offsetY / height) * (scale / 2) - scale / 4

				const xP = -x
				const yP = -y

				// Move the image towards the opposite direction of the mouse position
				e.currentTarget.querySelector("div")?.style.setProperty("--x", `${xP}%`)
				e.currentTarget.querySelector("div")?.style.setProperty("--y", `${yP}%`)
			}}
		>
			{children}
		</div>
	)
}
