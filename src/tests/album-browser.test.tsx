import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '@/app/page'
import { createMockAlbums } from './mocks/sanity-mock'
import { HttpResponse, http } from 'msw'
import { server } from './setup'

const ServerComponentWrapper = async ({ children }: { children: Promise<React.ReactNode> }) => {
  const resolvedChildren = await children
  return <>{resolvedChildren}</>
}

describe.browser('Album Display Browser Integration', async () => {
  beforeEach(() => {
    const mockAlbums = createMockAlbums(2, 10)
    
    server.use(
      http.get('https://*.api.sanity.io/*%5B_type%20%3D%3D%20%22album%22%5D*', () => {
        return HttpResponse.json(mockAlbums)
      }),
      http.get('https://*.apicdn.sanity.io/*%5B_type%20%3D%3D%20%22album%22%5D*', () => {
        return HttpResponse.json(mockAlbums)
      })
    )
  })

  test('horizontal scrolling works in album display', async () => {
    const user = userEvent.setup()
    const homePagePromise = HomePage()
    
    render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    await homePagePromise
    
    // Find the main element which should contain the albums
    const main = screen.getByRole('main')
    
    // Get the first album gallery by finding the parent of album title
    const albumTitle = screen.getByText('Album 1')
    const albumDiv = albumTitle.closest('div')
    
    // Find the scroll container within the album using data-testid
    const albumGallery = within(albumDiv).getByTestId('album-gallery')
    
    const initialScrollLeft = albumGallery.scrollLeft
    
    await user.pointer([
      { target: albumGallery, keys: '[MouseLeft>]' },
      { pointerName: 'mouse', target: albumGallery, wheel: { deltaX: 100 } },
      { pointerName: 'mouse', target: albumGallery, keys: '[/MouseLeft]' }
    ])
    
    expect(albumGallery.scrollLeft).toBeGreaterThan(initialScrollLeft)
  })
  
  test('images load and display correctly', async () => {
    const homePagePromise = HomePage()
    
    render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    await homePagePromise
    
    // Check if album titles are present
    expect(screen.getByText('Album 1')).toBeInTheDocument()
    expect(screen.getByText('Album 2')).toBeInTheDocument()
    
    // Get all images
    const images = screen.getAllByAltText('Photography')
    expect(images.length).toBe(20)
    
    // Check image attributes
    for (const img of images) {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
    }
  })
}) 