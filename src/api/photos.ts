import { client } from "@/lib/sanity"
import { defineQuery } from "groq"
import type { TypedObject } from "sanity"

const homepageAlbumsQuery = defineQuery(
	'*[_type == "album"]{ _id, title, images, order, excerpt, visible } | order(_createdAt desc)',
)

interface HomepageAlbum {
	_id: string
	title: string
	excerpt: TypedObject | TypedObject[]
	images: {
		_key: string
		visible: boolean
		asset: {
			_ref: string
		}
	}[]
	order: string
}

type HomepageAlbumsQuery = HomepageAlbum[]

export async function getHomepageAlbums(): Promise<HomepageAlbumsQuery> {
	return await client
		.fetch(homepageAlbumsQuery)
		.then((albums: HomepageAlbumsQuery) =>
			albums.sort((a, b) => Number.parseInt(b.order) - Number.parseInt(a.order)),
		)
		.then((albums: HomepageAlbumsQuery) =>
			albums.filter((album) => ({
				...album,
				images: album.images.filter((image) => image.visible),
			})),
		)
}
