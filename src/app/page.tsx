import { getHomepageAlbums } from "@/api/photos"
import { urlFor } from "@/lib/sanity-image"
import { PortableText } from "@portabletext/react"

export default async function HomePage() {
	const albums = await getHomepageAlbums()
	return (
		<main className="flex flex-col gap-6 pb-10 md:gap-20 lg:gap-30">
			{albums.map((album, index) => (
				<div key={album._id}>
					<div
						data-testid="album-gallery"
						className="relative flex w-full flex-row gap-10 overflow-x-auto px-4 py-[var(--body-gutter)] md:gap-20 lg:gap-25"
					>
						{album.images.map((image) => {
							const imageDimensions = getImageDimensions({
								height: 500,
								src: image.asset._ref,
							})
							return (
								<div key={image._key} className="contents">
									<img
										src={urlFor(image.asset._ref)
											.height(imageDimensions.height * 2)
											.width(imageDimensions.width * 2)
											.format("webp")
											.quality(95)
											.url()}
										alt="Photography"
										height={imageDimensions.height}
										width={imageDimensions.width}
										style={{
											// @ts-ignore css variables
											"--h":
												"calc(100lvh - var(--header-height) - calc(var(--body-gutter) * 2))",
										}}
										className="h-[var(--h)] max-h-[200px] w-auto max-w-max bg-gray-200 md:max-h-[400px] lg:max-h-[550px] xl:max-h-[600px] 2xl:max-h-[650px]"
										loading={index < 2 ? "eager" : "lazy"}
										decoding="async"
									/>
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
