import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'
import { mockAlbumsResponse } from './interceptors/sanity-interceptor'

// Create a wrapper to render server components
const ServerComponentWrapper = async ({ children }: { children: Promise<React.ReactNode> }) => {
  const resolvedChildren = await children
  return <>{resolvedChildren}</>
}

describe('HomePage Integration', async () => {
  beforeEach(() => {
    // Set up mock response for albums
    mockAlbumsResponse()
  })

  test('renders the homepage with albums and images', async () => {
    const homePagePromise = HomePage()
    
    const { container } = render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    // Wait for component to resolve
    await homePagePromise
    
    // Test for album titles
    expect(screen.getByText('Album 1')).toBeInTheDocument()
    expect(screen.getByText('Album 2')).toBeInTheDocument()
    
    // Test for album excerpts
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
    
    // Test for images
    const images = container.querySelectorAll('img')
    expect(images.length).toBe(6) // 3 images per album, 2 albums
    
    // Check alt text on images
    for (const img of images) {
      expect(img).toHaveAttribute('alt', 'Photography')
    }
  })
}) 