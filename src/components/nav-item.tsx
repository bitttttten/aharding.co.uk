"use client"

import { useHeaderContext } from "@/context/header"
import * as m from "motion/react-m"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavItem({
	children,
	href,
}: React.PropsWithChildren<{ href: string }>) {
	const { hover, setHover } = useHeaderContext()
	const pathname = usePathname()
	const isActive = pathname === href || hover === href

	return (
		<Link
			href={href}
			className="relative inline-flex items-center py-1.5 text-base leading-none hover:text-secondary"
			onMouseOver={() => setHover(href)}
			onMouseOut={() => isActive && setHover(null)}
		>
			{children}
			{isActive ? <Underline /> : null}
		</Link>
	)
}

function Underline() {
	const isActive = Boolean(useHeaderContext().hover)
	return (
		<m.div
			className={`absolute bottom-0 left-0 h-[2px] w-full ${isActive ? "bg-secondary" : "bg-primary"}`}
			layoutId="underline"
		/>
	)
}
