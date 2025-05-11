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

describe('Album Display Integration', async () => {
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

  test('renders album galleries with correct content', async () => {
    const homePagePromise = HomePage()
    
    render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    await homePagePromise

    expect(screen.getByText('Album 1')).toBeInTheDocument()
    expect(screen.getByText('Album 2')).toBeInTheDocument()
    
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
  })
  
  test('images load and display correctly', async () => {
    const homePagePromise = HomePage()
    
    render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    await homePagePromise
    
    const images = screen.getAllByAltText('Photography')
    expect(images.length).toBe(20)
    
    for (const img of images) {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
    }
  })
}) 