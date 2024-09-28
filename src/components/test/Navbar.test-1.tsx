import { fireEvent, render, screen } from '@testing-library/react'
import React, { Component } from 'react'
import Navbar from '../Navbar'

test("Render Navbar", () => {
    render(<Navbar />)

    const hamburger = screen.getByTestId("hamburger")
    const navbarElement = screen.getByTestId("navbar")
    
    fireEvent.click(hamburger)
    expect(navbarElement).toBeInTheDocument()
})
