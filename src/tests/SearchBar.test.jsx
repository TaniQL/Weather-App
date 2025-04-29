import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../components/SearchBar'
import { vi } from 'vitest'
import React from 'react'

describe('SearchBar', () => {

    it('renders input and buttons correctly', () => {
        render(<SearchBar onSearch={() => {}} onUseLocation={() => {}} />)
   
        expect(screen.getByPlaceholderText(/Enter a city/i)).toBeInTheDocument()
    
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()

    })
     
  it('calls setCity on input change', () => {
    const setCityMock = vi.fn()
    render(
      <SearchBar
        city=""
        setCity={setCityMock}
        onSearch={() => {}}
        onUseLocation={() => {}}
      />
    )

    const input = screen.getByPlaceholderText(/Enter a city/i)
    fireEvent.change(input, { target: { value: 'Lima' } })

    expect(setCityMock).toHaveBeenCalledWith('Lima')
  })
})