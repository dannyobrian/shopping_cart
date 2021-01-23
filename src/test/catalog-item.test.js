import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CatalogItem } from '../components/catalog-item';
import { Products } from '../components';
import { initialState as Stock } from '../store/slices/stock.slice';

test(`renders CatalogItem component`, () => {
    const props = {
        sku: Stock.items[0].sku,
        ...Products[Stock.items[0].sku],
    };
    render(<CatalogItem {...props} />);
    const buttonElement = screen.getByText(/Add to basket/i);
    expect(buttonElement).toBeInTheDocument();
});

test(`renders error if multiple size available but not selected before clicking add button`, async () => {
    const props = {
        sku: Stock.items[2].sku,
        ...Products[Stock.items[2].sku],
    };
    render(<CatalogItem {...props} />);
    const buttonElement = screen.getByText(/Add to basket/i);
    await waitFor(() => fireEvent.click(buttonElement));

    expect(screen.getByText(`You must select a size before adding to the basket`)).toBeInTheDocument();
});

test(`handles changing packSize`, async () => {
    const props = {
        sku: Stock.items[2].sku,
        ...Products[Stock.items[2].sku],
    };
    const { getByTestId, getByText, queryByText } = render(<CatalogItem {...props} />);
    const buttonElement = getByText(/Add to basket/i);
    await waitFor(() => fireEvent.click(buttonElement));

    expect(getByText(`You must select a size before adding to the basket`)).toBeInTheDocument();

    const dropDownElement = getByTestId(`dropdown`);
    await waitFor(() => fireEvent.change(dropDownElement, { target: { value: 1 } }));
    expect(queryByText(`You must select a size before adding to the basket`)).not.toBeInTheDocument();

    await waitFor(() => fireEvent.change(dropDownElement, { target: { value: `Select size:` } }));
    expect(queryByText(`You must select a size before adding to the basket`)).toBeInTheDocument();
});
