import { render, screen } from '@testing-library/react';
import React from 'react'
import Header from '../Header';

test('render menu', () => {
    render(<Header/>);
    const linkElement = screen.getByText("Learn React")
    expect(linkElement).toBeInTheDocument()
});