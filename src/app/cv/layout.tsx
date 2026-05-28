import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"

const spaceMono = Space_Mono({
	weight: "700",
	subsets: ["latin"],
	variable: "--font-space-mono",
})

export const metadata: Metadata = {
	title: "cv - aharding.co.uk",
	description: "cv",
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <div className={spaceMono.variable}>{children}</div>
}
