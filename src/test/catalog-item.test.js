import React from 'react';
import { render, screen } from '@testing-library/react';
import { CatalogItem } from '../components/catalog-item';
import { Products } from '../components';
import { Stock } from '../components';

const props = {
    sku: Stock[0].sku,
    ...Products[Stock[0].sku],
};

test(`renders CatalogItem component`, () => {
    render(<CatalogItem {...props} />);
    const buttonElement = screen.getByText(/Add to basket/i);
    expect(buttonElement).toBeInTheDocument();
});
