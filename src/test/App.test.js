import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test(`renders imported components`, () => {
    render(<App />);
    const CatalogElement = screen.getByText(/Catalog/);
    expect(CatalogElement).toBeInTheDocument();
    const ReceiptElement = screen.getByText(/Receipt/);
    expect(ReceiptElement).toBeInTheDocument();
});
