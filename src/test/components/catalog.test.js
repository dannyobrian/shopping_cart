import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { Catalog } from '../../components';
import store from '../../store';
import { resetStock } from '../../store/slices/stock.slice';

beforeEach(() => {
    render(
        <Provider store={store}>
            <Catalog />
        </Provider>
    );
});

test(`Renders all expected class elements`, () => {
    const { container } = render(
        <Provider store={store}>
            <Catalog />
        </Provider>
    );
    expect(container.getElementsByClassName(`catalogItem`).length).toBe(3);
    expect(container.getElementsByClassName(`row`).length).toBe(3);
    expect(container.getElementsByClassName(`col`).length).toBe(6);
});

test(`Clicking add to basket correctly adds items to Redux store basket`, () => {
    expect(store.getState().basket.contents.length).toEqual(0);

    fireEvent.click(screen.getAllByText(/Add to basket/)[0]);
    expect(store.getState().basket.contents.length).toEqual(1);
    expect(store.getState().basket.contents[0].qty).toEqual(1);

    fireEvent.click(screen.getAllByText(/Add to basket/)[0]);
    expect(store.getState().basket.contents.length).toEqual(1);
    expect(store.getState().basket.contents[0].qty).toEqual(2);

    fireEvent.click(screen.getAllByText(/Add to basket/)[1]);
    expect(store.getState().basket.contents.length).toEqual(2);
    expect(store.getState().basket.contents[1].qty).toEqual(1);

    fireEvent.click(screen.getAllByText(/Add to basket/)[1]);
    expect(store.getState().basket.contents.length).toEqual(2);
    expect(store.getState().basket.contents[1].qty).toEqual(2);
});

test(`Clicking add to basket correctly removes items from Redux store stock`, () => {
    store.dispatch(resetStock());
    expect(store.getState().stock.items[0].stock[0].qty).toEqual(100);
    fireEvent.click(screen.getAllByText(/Add to basket/)[0]);
    expect(store.getState().stock.items[0].stock[0].qty).toEqual(99);
    fireEvent.click(screen.getAllByText(/Add to basket/)[0]);
    expect(store.getState().stock.items[0].stock[0].qty).toEqual(98);

    store.dispatch(resetStock());
    expect(store.getState().stock.items[1].stock[0].qty).toEqual(100);
    fireEvent.click(screen.getAllByText(/Add to basket/)[1]);
    expect(store.getState().stock.items[1].stock[0].qty).toEqual(99);
    fireEvent.click(screen.getAllByText(/Add to basket/)[1]);
    expect(store.getState().stock.items[1].stock[0].qty).toEqual(98);
});
