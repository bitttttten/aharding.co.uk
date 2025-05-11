import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
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
    
    const { container } = render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    await homePagePromise
    
    const albumContainers = container.querySelectorAll('.overflow-x-auto')
    expect(albumContainers.length).toBeGreaterThan(0)
    
    const firstAlbumContainer = albumContainers[0]
    
    const initialScrollLeft = firstAlbumContainer.scrollLeft
    
    await user.pointer([
      { target: firstAlbumContainer, keys: '[MouseLeft>]' },
      { pointerName: 'mouse', target: firstAlbumContainer, wheel: { deltaX: 100 } },
      { pointerName: 'mouse', target: firstAlbumContainer, keys: '[/MouseLeft]' }
    ])
    
    expect(firstAlbumContainer.scrollLeft).toBeGreaterThan(initialScrollLeft)
  })
  
  test('images load and display correctly', async () => {
    const homePagePromise = HomePage()
    
    const { container } = render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    await homePagePromise
    
    const images = container.querySelectorAll('img')
    expect(images.length).toBe(20)
    
    for (const img of images) {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt', 'Photography')
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
    }
  })
}) 