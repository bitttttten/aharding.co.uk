import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { sanityWorkspace } from "#/sanity.workspace"

export function urlFor(source: SanityImageSource) {
	return imageUrlBuilder(sanityWorkspace).image(source)
}
