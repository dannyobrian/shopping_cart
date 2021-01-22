import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test(`renders imported components`, () => {
    render(<App />);
    const linkElement = screen.getByText(/items in basket/);
    expect(linkElement).toBeInTheDocument();
});
