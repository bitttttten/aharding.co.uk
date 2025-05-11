import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/header'

vi.stubGlobal('usePathname', () => '/')

describe('Navigation Integration', () => {
  test('header renders with navigation items', async () => {
    render(<Header />)
    
    const navItems = screen.getAllByRole('link')
    expect(navItems.length).toBeGreaterThan(0)
  })
  
  test('navigation is accessible via keyboard', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const links = screen.getAllByRole('link')
    
    await user.tab()
    expect(links[0]).toHaveFocus()
    
    const mockClick = vi.fn()
    links[0].addEventListener('click', mockClick)
    await user.keyboard('{Enter}')
    expect(mockClick).toHaveBeenCalled()
  })
}) 