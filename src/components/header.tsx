import { NavItem } from "@/components/nav-item"
import { HeaderContextProvider } from "@/context/header"

export function Header() {
	return (
		<HeaderContextProvider>
			<header className="h-[var(--header-height)] print:hidden">
				<nav className="fixed z-10 flex h-[var(--header-height)] w-full items-center space-x-[30px] bg-gray-100 bg-opacity-75 px-[24px] backdrop-blur-sm backdrop-saturate-100 md:h-[76px] md:px-[32px] xl:px-[35px]">
					<NavItem href="/">photos</NavItem>
					<NavItem href="/sketchbook">sketchbook</NavItem>
				</nav>
			</header>
		</HeaderContextProvider>
	)
}
