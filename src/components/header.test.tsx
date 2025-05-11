import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { Header } from './header'

// Mock the usePathname function
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  test('renders navigation links', () => {
    render(<Header />)
    
    expect(screen.getByText('photos')).toBeInTheDocument()
    expect(screen.getByText('sketchbook')).toBeInTheDocument()
  })

  test('navigation is accessible via keyboard', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    
    await user.tab()
    expect(links[0]).toHaveFocus()
    
    // Only proceed if we have at least one link
    if (links[0]) {
      const mockClick = vi.fn()
      links[0].addEventListener('click', mockClick)
      await user.keyboard('{Enter}')
      expect(mockClick).toHaveBeenCalled()
    }
  })
}) 