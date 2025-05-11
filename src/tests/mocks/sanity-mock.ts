export function createMockAlbums(count = 2, imagesPerAlbum = 3) {
	return Array(count)
		.fill(0)
		.map((_, i) => ({
			_id: `album-${i}`,
			title: `Album ${i + 1}`,
			excerpt: [
				{
					_type: "block",
					children: [{ _type: "span", text: `Description ${i + 1}` }],
				},
			],
			images: Array(imagesPerAlbum)
				.fill(0)
				.map((_, j) => ({
					_key: `img-${i}-${j}`,
					visible: true,
					asset: {
						_ref: `image-${i}${j}-1000x800-jpg`,
					},
				})),
			order: `${i + 1}`,
		}))
}
