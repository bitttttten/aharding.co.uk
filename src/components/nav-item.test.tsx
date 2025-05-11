import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { NavItem } from './nav-item'

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Mock the header context
vi.mock('@/context/header', () => ({
  useHeaderContext: () => ({
    hover: null,
    setHover: vi.fn(),
  }),
}))

describe('NavItem', () => {
  test('renders link with correct text', () => {
    render(<NavItem href="/test">Test Link</NavItem>)
    
    const link = screen.getByText('Test Link')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/test')
  })

  test('handles mouse events', async () => {
    const user = userEvent.setup()
    
    // We need to mock the useHeaderContext with a real mock function to verify calls
    const mockSetHover = vi.fn()
    vi.mocked(require('@/context/header').useHeaderContext).mockReturnValue({
      hover: null,
      setHover: mockSetHover,
    })
    
    render(<NavItem href="/test">Test Link</NavItem>)
    
    const link = screen.getByText('Test Link')
    
    // Hover over the link
    await user.hover(link)
    expect(mockSetHover).toHaveBeenCalledWith('/test')
    
    // Move away from the link
    await user.unhover(link)
    expect(mockSetHover).toHaveBeenCalledWith(null)
  })
}) 