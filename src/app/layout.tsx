import { Header } from "@/components/header"
import localFont from "next/font/local"

import "@/styles/globals.css"

import { LazyMotion } from "@/components/lazy-motion"
import type { Metadata } from "next"

const messinaSansMono = localFont({
	src: "../fonts/MessinaSansMono-SemiBold.woff2",
	display: "swap",
})

export const metadata: Metadata = {
	title: "aaron harding - aharding.co.uk",
	description:
		"web development, photography, drawing, and the odd tepache recipe or three",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<LazyMotion>
			<html lang="en" className={`${messinaSansMono.className} bg-gray-100`}>
				<body
					style={{
						// @ts-ignore css classes
						"--body-gutter": "16px",
						"--header-height": "76px",
					}}
				>
					<Header />
					{children}
				</body>
			</html>
		</LazyMotion>
	)
}
