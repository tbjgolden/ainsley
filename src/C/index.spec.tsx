import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import C from './index'

describe('C Component', () => {
  it('should render correctly', async () => {
    render(<C text="hello there" />)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  })
})
