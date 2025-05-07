import { getHomepageAlbums } from "@/api/photos"
import { urlFor } from "@/lib/sanity-image"

export default async function HomePage() {
	const albums = await getHomepageAlbums()
	const height = 800
	return (
		<main className="flex flex-col gap-30">
			{albums.map((album) => (
				<div
					key={album._id}
					className="relative flex w-full flex-row gap-25 overflow-x-auto px-4 py-[var(--body-gutter)]"
				>
					{album.images.map((image) => (
						<div key={image._key} className="contents">
							<img
								src={urlFor(image.asset._ref)
									.height(height * 2)
									.url()}
								alt="Photography"
								height={height}
								width={getWidth({ height, src: image.asset._ref })}
								style={{
									// @ts-ignore css classes
									"--h": 'calc(100lvh - var(--header-height) - calc(var(--body-gutter) * 2))',
								}}
								className="h-[var(--h)] max-h-[400px] w-auto lg:max-h-[750px]"
								loading="lazy"
								decoding="async"
							/>
						</div>
					))}
					<div className="absolute inset-0" />
				</div>
			))}
		</main>
	)
}

// a `_ref` from sanity is like "image-1d47584394432100af92243d418a520af114b23a-4492x6774-jpg"
// where 4492 is the width and 6774 is the height
// we want to get the width of the image based on the height, to work out the aspect ratio
// to find the target width
function getWidth({ height, src }: { height: number; src: string }) {
	const segments = src.split("-")
	const widthAndHeight = segments[segments.length - 2]
	const [sourceWidth = "1", sourceHeight = "1"] =
		widthAndHeight?.split("x") ?? []
	const aspectRatio =
		Number.parseInt(sourceWidth) / Number.parseInt(sourceHeight)
	return height * aspectRatio
}
