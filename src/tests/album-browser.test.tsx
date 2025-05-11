import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '@/app/page'
import { createMockAlbums, interceptSanityRequests } from './interceptors/sanity-interceptor'
import { HttpResponse } from 'msw'

// Create a wrapper to render server components
const ServerComponentWrapper = async ({ children }: { children: Promise<React.ReactNode> }) => {
  const resolvedChildren = await children
  return <>{resolvedChildren}</>
}

// This test will run in browser mode, enabling more realistic interaction testing
describe.browser('Album Display Browser Integration', async () => {
  beforeEach(() => {
    // Create mock albums with more images for scrolling tests
    const mockAlbums = createMockAlbums(2, 10)
    
    interceptSanityRequests((url) => {
      // Check if the request is for albums
      if (url.includes('*%5B_type%20%3D%3D%20%22album%22%5D')) {
        return HttpResponse.json(mockAlbums)
      }
      
      // Default response for other Sanity requests
      return HttpResponse.json({ error: 'Not mocked' }, { status: 404 })
    })
  })

  test('horizontal scrolling works in album display', async () => {
    const user = userEvent.setup()
    const homePagePromise = HomePage()
    
    const { container } = render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    // Wait for component to resolve
    await homePagePromise
    
    // Find the album container (scroll container)
    const albumContainers = container.querySelectorAll('.overflow-x-auto')
    expect(albumContainers.length).toBeGreaterThan(0)
    
    const firstAlbumContainer = albumContainers[0]
    
    // Get initial scroll position
    const initialScrollLeft = firstAlbumContainer.scrollLeft
    
    // Scroll horizontally using wheel event
    await user.pointer([
      { target: firstAlbumContainer, keys: '[MouseLeft>]' },
      { pointerName: 'mouse', target: firstAlbumContainer, wheel: { deltaX: 100 } },
      { pointerName: 'mouse', target: firstAlbumContainer, keys: '[/MouseLeft]' }
    ])
    
    // Check if scrolling occurred
    expect(firstAlbumContainer.scrollLeft).toBeGreaterThan(initialScrollLeft)
  })
  
  test('images load and display correctly', async () => {
    const homePagePromise = HomePage()
    
    const { container } = render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    // Wait for component to resolve
    await homePagePromise
    
    // Wait for all images to load
    const images = container.querySelectorAll('img')
    expect(images.length).toBe(20) // 10 images per album, 2 albums
    
    // Check if images have proper attributes
    for (const img of images) {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt', 'Photography')
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
    }
  })
}) 