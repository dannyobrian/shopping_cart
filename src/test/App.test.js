import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test(`renders imported components`, () => {
    render(<App />);
    const linkElement = screen.getByText(/items in basket/);
    expect(linkElement).toBeInTheDocument();
});

test(`renders expected components`, () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName(`container`).length).toEqual(1);
    expect(container.getElementsByClassName(`App`).length).toEqual(1);
    expect(container.getElementsByClassName(`basket`).length).toEqual(1);
    expect(container.getElementsByClassName(`catalog`).length).toEqual(1);
    expect(container.getElementsByClassName(`receipt`).length).toEqual(1);
});
