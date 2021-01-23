import React from 'react';
import { render, screen } from '@testing-library/react';
import { Products, Receipt, testInternalMethods } from '../components';
import { Provider } from 'react-redux';

import {
    mockBasketContents,
    mockBasketLineItems,
    mockCumulativeStockItem,
    mockDiscreteStockItem,
    mockInitialState,
    mockSavingsResult,
    mockState,
    mockStore,
} from './mocks';

const {
    formatAmount,
    itemNetTotal,
    itemDiscount,
    priceByVolume,
    netTotal,
    parseReceiptLineItems,
    parseSavingsItems,
    subTotal,
    totalSavings,
    ReceiptRow,
    ReceiptDetailRow,
} = testInternalMethods;

test(`renders Receipt component`, () => {
    const store = mockStore(mockInitialState);
    const { container } = render(
        <Provider store={store}>
            <Receipt />
        </Provider>
    );
    expect(container.getElementsByClassName(`receipt`)).toHaveLength(1);
});

test(`renders Receipt component elements with initial state`, () => {
    const store = mockStore(mockInitialState);
    render(
        <Provider store={store}>
            <Receipt />
        </Provider>
    );
    expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
    expect(screen.getByText(/Total to pay/)).toBeInTheDocument();
    expect(screen.getAllByText(/0.00/)).toHaveLength(2);
});

test(`renders Receipt component elements with populated state`, () => {
    const store = mockStore(mockState);
    render(
        <Provider store={store}>
            <Receipt />
        </Provider>
    );
    expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
    expect(screen.getByText(/Total to pay/)).toBeInTheDocument();
    expect(screen.getAllByText(/19.99/)).toHaveLength(1);
    expect(screen.getAllByText(/Hand Sanitizer/)).toHaveLength(1);
    expect(screen.getByText(/0.675 l @ 19.99 \/ l/)).toBeInTheDocument();
    expect(screen.getAllByText(/19.99/)).toHaveLength(1);
    expect(screen.getAllByText(/Toilet Paper/)).toHaveLength(7);
    expect(screen.getAllByText(/Toilet Paper \(6 for price of 5\)/)).toHaveLength(1);
    expect(screen.getAllByText(/0.65/)).toHaveLength(7);
    expect(screen.getAllByText(/Face Mask/)).toHaveLength(3);
    expect(screen.getAllByText(/Face Mask \(2 for £4\)/)).toHaveLength(1);
    expect(screen.getAllByText(/2.50/)).toHaveLength(2);
    expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
    expect(screen.getByText(/Total to pay/)).toBeInTheDocument();
    expect(screen.getByText(/Total Savings/)).toBeInTheDocument();
    expect(screen.getAllByText(/-0.65/)).toHaveLength(1);
    expect(screen.getAllByText(/-1.00/)).toHaveLength(1);
    expect(screen.getAllByText(/22.39/)).toHaveLength(1);
    expect(screen.getAllByText(/20.74/)).toHaveLength(1);
});

test(`renders ReceiptRow component`, () => {
    render(<ReceiptRow item={mockBasketLineItems[0]} />);
    expect(screen.getByText(/Toilet Paper/)).toBeInTheDocument();
    expect(screen.getByText(/0.65/)).toBeInTheDocument();
});

test(`renders ReceiptDetailRow component`, () => {
    render(<ReceiptDetailRow item={mockBasketLineItems[8]} />);
    expect(screen.getAllByText(/Hand Sanitizer/)).toHaveLength(1);
    expect(screen.getByText(/0.675 l @ 19.99 \/ l/)).toBeInTheDocument();
    expect(screen.getAllByText(/19.99/)).toHaveLength(1);
    expect(screen.getAllByText(/13.49/)).toHaveLength(1);
});

test(`calculate netTotal correctly`, () => {
    expect(formatAmount(netTotal(mockBasketContents))).toEqual(`20.74`);
});

test(`calculate subTotal correctly`, () => {
    expect(formatAmount(subTotal(mockBasketContents))).toEqual(`22.39`);
});

test(`calculate itemDiscount correctly`, () => {
    expect(formatAmount(itemDiscount(2, Products[`faceMask`]))).toEqual(`-1.00`);
});

test(`calculate discounted itemNetTotal correctly`, () => {
    expect(formatAmount(itemNetTotal(2, Products[`faceMask`]))).toEqual(`4.00`);
});
test(`calculate undiscounted itemNetTotal correctly`, () => {
    expect(formatAmount(itemNetTotal(5, Products[`handSanitizer`]))).toEqual(`99.95`);
});

test(`calculate price per total volume of cumulative items correctly`, () => {
    expect(formatAmount(priceByVolume(mockCumulativeStockItem))).toEqual(`13.49`);
});

test(`calculate price per total volume of discrete items correctly`, () => {
    expect(formatAmount(priceByVolume(mockDiscreteStockItem))).toEqual(`0.65`);
});

test(`calculate total savings correctly`, () => {
    expect(formatAmount(totalSavings(mockBasketContents))).toEqual(`-1.65`);
});

test(`return an array of savings`, () => {
    expect(parseSavingsItems(mockBasketContents)).toEqual(mockSavingsResult);
});

test(`return an array of line items`, () => {
    expect(parseReceiptLineItems(mockBasketContents)).toEqual(mockBasketLineItems);
});
