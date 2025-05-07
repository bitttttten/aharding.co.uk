"use client"

import { SketchHover } from "./sketch-hover"

interface SketchDisplayProps extends React.ComponentProps<"img"> {
	width: number
	height: number
}

export default function SketchDisplay({
	width,
	height,
	...props
}: SketchDisplayProps) {
	const aspectRatio = width / height

	return (
		<SketchHover aspectRatio={aspectRatio}>
			<div className="relative top-[var(--y)] left-[var(--x)]">
				<img
					{...props}
					alt={props.alt}
					className={`h-auto w-full group-hover:scale-[var(--scale)] ${props.className}`}
				/>
			</div>
		</SketchHover>
	)
}
