import React from 'react';
import { render, screen } from '@testing-library/react';
import { Receipt } from '../components';

test(`renders Receipt component`, () => {
    render(<Receipt />);
    const linkElement = screen.getByText(/Receipt/i);
    expect(linkElement).toBeInTheDocument();
});
