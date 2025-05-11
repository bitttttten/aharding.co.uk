import { getHomepageAlbums } from "@/api/photos"
import { urlFor } from "@/lib/sanity-image"
import { PortableText } from "@portabletext/react"

export default async function HomePage() {
	const albums = await getHomepageAlbums()
	const height = 800
	return (
		<main className="flex flex-col gap-30 pb-10">
			{albums.map((album) => (
				<div key={album._id}>
					<div className="relative flex w-full flex-row gap-25 overflow-x-auto px-4 py-[var(--body-gutter)]">
						{album.images.map((image) => {
							const imageDimensions = getImageDimensions({ height, src: image.asset._ref })
							return (
								<div key={image._key} className="contents">
									<img
										src={urlFor(image.asset._ref)
											.height(imageDimensions.height * 2)
											.width(imageDimensions.width * 2)
											.url()}
										alt="Photography"
										height={imageDimensions.height}
										width={imageDimensions.width}
										style={{
											// @ts-ignore css classes
											"--h": "calc(100lvh - var(--header-height) - calc(var(--body-gutter) * 2))",
										}}
										className="h-[var(--h)] max-h-[400px] w-auto lg:max-h-[750px]"
										loading="lazy"
										decoding="async" />
								</div>
							)
						})}
						<div className="absolute inset-0" />
					</div>
					<div className="flex gap-2 px-4 text-sm">
						<p>{album.title}</p> - <PortableText value={album.excerpt} />
					</div>
				</div>
			))}
		</main>
	)
}


function getImageDimensions({ height, src }: { height: number; src: string }) {
	const segments = src.split("-")
	const widthAndHeight = segments[segments.length - 2]
	const [sourceWidth = "1", sourceHeight = "1"] =
		widthAndHeight?.split("x") ?? []
	const aspectRatio =
		Number.parseInt(sourceWidth) / Number.parseInt(sourceHeight)
	return { aspectRatio, width: Math.round(height * aspectRatio), height }
}
