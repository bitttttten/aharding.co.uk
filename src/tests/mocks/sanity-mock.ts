import { HttpResponse, http } from 'msw'
import { server } from '../setup'

export type SanityResponseHandler = (url: string, request: Request) => Response | Promise<Response>

export function interceptSanityRequests(responseHandler: SanityResponseHandler) {
  server.use(
    http.all('https://*.apicdn.sanity.io/*', responseHandler),
    http.all('https://*.api.sanity.io/*', responseHandler)
  )
}

export function createMockAlbums(count = 2, imagesPerAlbum = 3) {
  return Array(count).fill(0).map((_, i) => ({
    _id: `album-${i}`,
    title: `Album ${i + 1}`,
    excerpt: [{ _type: 'block', children: [{ _type: 'span', text: `Description ${i + 1}` }] }],
    images: Array(imagesPerAlbum).fill(0).map((_, j) => ({
      _key: `img-${i}-${j}`,
      visible: true,
      asset: {
        _ref: `image-${i}${j}-1000x800-jpg`,
      },
    })),
    order: `${i + 1}`,
  }))
}

export function mockAlbumsResponse() {
  const mockAlbums = createMockAlbums()
  
  interceptSanityRequests((url, request) => {
    if (request.method === 'GET' && url.includes('*%5B_type%20%3D%3D%20%22album%22%5D')) {
      return HttpResponse.json(mockAlbums)
    }
    
    return HttpResponse.json({ error: 'Not mocked' }, { status: 404 })
  })
  
  return mockAlbums
} 