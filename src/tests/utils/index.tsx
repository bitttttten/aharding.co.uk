export async function ServerComponentWrapper({
	children,
}: { children: Promise<React.ReactNode> }) {
	const resolvedChildren = await children
	return <>{resolvedChildren}</>
}
