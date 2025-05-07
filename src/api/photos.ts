import { client } from "@/lib/sanity"
import { defineQuery } from "groq"

const homepageAlbumsQuery = defineQuery(
	'*[_type == "album"]{ _id, title, images, order }',
)

interface HomepageAlbum {
	_id: string
	title: string
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
