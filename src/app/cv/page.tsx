import { NameButton } from "@/components/name-button"
import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import Image from "next/image"

export default function CVPage() {
	return (
		<main>
			<GridContainer>
				<Image
					src="/selfies/2.jpeg"
					width={1146}
					height={1600}
					alt="Aaron Harding"
					className="ml-auto h-[1000px] max-h-[calc(100svh/2)] w-auto overflow-hidden rounded-xl"
				/>
				<p className="text-gray-500 text-sm">hello my name is</p>
				<h1 className="mb-2 w-full text-6xl tracking-tighter">Aaron Harding</h1>
				<section className="mb-10 flex gap-2">
					<small>pronounced /ˈɛə.ɹən/</small>
					<NameButton>
						<svg
							className="h-[50%] w-[50%] translate-x-[1px] transform"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 210 210"
						>
							<title>Play</title>
							<path d="M179.07,105L30.93,210V0L179.07,105z" />
						</svg>
					</NameButton>
				</section>

				<div className="mt-12 flex flex-wrap gap-2">
					{["TypeScript", "React", "TanStack", "Next.js", "Cursor"].map(
						(tech) => (
							<span
								key={tech}
								className="rounded-full border border-green-200 px-3 py-1 text-sm"
							>
								{tech}
							</span>
						),
					)}
				</div>
			</GridContainer>
			<ul className="mt-24 mb-24 divide-y-[1px] divide-gray-200">
				{[
					{
						id: "creative-fabrica",
						title: "Sr. Staff Frontend Engineer at Creative Fabrica",
						description:
							"From Senior Frontend Developer, to Lead Frontend Developer to Sr. Staff Frontend Engineer.",
						date: "2023 -",
					},
					{
						id: "proveg",
						title: "Lead Frontend Developer at ProVeg",
						description:
							"Helped build the new ProVeg website from the ground up, and then later helped to migrate it to a new platform.",
						date: "2021 - 2023",
					},
				].map((item) => (
					<GridContainer
						key={item.id}
						className="grid grid-cols-[1fr_auto] gap-x-12 gap-y-4 bg-gray-200/50 py-8 hover:bg-gray-200"
						asChild
					>
						<li>
							<h2 className="font-bold text-xl tracking-tighter">
								{item.title}
							</h2>
							<p className="col-start-2 row-span-2 self-center text-gray-500 text-lg">
								{item.date}
							</p>
							<p className="col-start-1 text-gray-500 text-sm">
								{item.description}
							</p>
						</li>
					</GridContainer>
				))}
			</ul>
		</main>
	)
}

function GridContainer({
	children,
	className,
	asChild,
}: React.PropsWithChildren<{ className?: string; asChild?: boolean }>) {
	const Component = asChild ? Slot : "div"
	return (
		<Component className={clsx("px-4 md:px-12 lg:px-16", className)}>
			{children}
		</Component>
	)
}
