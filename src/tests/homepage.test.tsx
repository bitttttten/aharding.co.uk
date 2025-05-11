import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'
import { mockAlbumsResponse } from './mocks/sanity-mock'

const ServerComponentWrapper = async ({ children }: { children: Promise<React.ReactNode> }) => {
  const resolvedChildren = await children
  return <>{resolvedChildren}</>
}

describe('HomePage Integration', async () => {
  beforeEach(() => {
    mockAlbumsResponse()
  })

  test('renders the homepage with albums and images', async () => {
    const homePagePromise = HomePage()
    
    const { container } = render(
      <ServerComponentWrapper>
        {homePagePromise}
      </ServerComponentWrapper>
    )
    
    await homePagePromise
    
    expect(screen.getByText('Album 1')).toBeInTheDocument()
    expect(screen.getByText('Album 2')).toBeInTheDocument()
    
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
    
    const images = container.querySelectorAll('img')
    expect(images.length).toBe(6)
    
    for (const img of images) {
      expect(img).toHaveAttribute('alt', 'Photography')
    }
  })
}) 