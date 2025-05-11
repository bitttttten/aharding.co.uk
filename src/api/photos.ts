import { client } from "@/lib/sanity"
import { defineQuery } from "groq"
import type { TypedObject } from "sanity"

const homepageAlbumsQuery = defineQuery(
	'*[_type == "album"]{ _id, title, images, order, excerpt } | order(_createdAt desc)',
)

interface HomepageAlbum {
	_id: string
	title: string
	excerpt: TypedObject | TypedObject[]
	images: {
		_key: string
		asset: {
			_ref: string
		}
	}[]
	order: number
}

type HomepageAlbumsQuery = HomepageAlbum[]

export async function getHomepageAlbums(): Promise<HomepageAlbumsQuery> {
	return await client
		.fetch(homepageAlbumsQuery)
		.then((albums: HomepageAlbumsQuery) => albums.sort((a, b) => b.order - a.order))
}
