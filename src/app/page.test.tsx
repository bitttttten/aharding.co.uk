import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, test } from 'vitest'
import { createMockAlbums } from '../tests/mocks/sanity-mock'
import { server } from '../tests/setup'
import { ServerComponentWrapper } from '../tests/utils'
import HomePage from './page'

describe('HomePage', async () => {
  beforeEach(() => {
    const mockAlbums = createMockAlbums(2, 10)
    
    server.use(
      http.get('https://*.api.sanity.io/*%5B_type%20%3D%3D%20%22album%22%5D*', () => {
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