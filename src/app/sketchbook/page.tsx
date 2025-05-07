import SketchDisplay from "@/components/sketch-display"

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
		<div className="mt-10 grid gap-5 px-[12px] py-[15px] sm:grid-cols-2 md:p-[20px] lg:grid-cols-3 xl:p-[35px]">
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
	)
}
