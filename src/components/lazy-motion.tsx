"use client"

import { LazyMotion as LazyMotionBase } from "motion/react"

const loadFeatures = () => import("@/lib/motion").then((r) => r.default)

export function LazyMotion({ children }: { children: React.ReactNode }) {
	return <LazyMotionBase features={loadFeatures}>{children}</LazyMotionBase>
}
