import InstagramLogo from "@/components/instagram-logo"
import SketchDisplay from "@/components/sketch-display"
import Link from "next/link"

const sketches = [
	{
		id: "1",
		name: "Leaning Woman I",
		description:
			"Giclée print, on fine art Hahnemühle paper at 300gm2. A6 sized.",
		image: {
			url: "/sketches/leaning-woman-1.jpeg",
			width: 750,
			height: 1000,
		},
	},
	{
		id: "2",
		name: "Leaning Man II",
		description:
			"Giclée print, on fine art Hahnemühle paper at 300gm2. A6 sized.",
		image: {
			url: "/sketches/leaning-man-1.jpeg",
			width: 750,
			height: 1000,
		},
	},
]

export default function SketchbookPage() {
	return (
		<div className="flex flex-col gap-16 px-[12px] py-[15px] md:p-[20px] xl:p-[35px]">
			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{sketches.map((item) => {
					return (
						<div key={item.id} className="flex flex-col gap-5">
							<SketchDisplay
								src={item.image.url}
								width={item.image.width}
								height={item.image.height}
								alt={item.name}
							/>
							<div className="flex flex-col gap-1">
								<p>{item.name}</p>
								<p className="text-sm">{item.description}</p>
							</div>
						</div>
					)
				})}
			</div>
			<Link
				href="https://www.instagram.com/_____aa"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center gap-2 text-sm"
				aria-label="Instagram profile"
			>
				<span>there's more over on</span>
				<InstagramLogo className="h-5 w-5" />
				at <span>_____aa</span>
			</Link>
		</div>
	)
}
