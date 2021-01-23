import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Catalog } from '../components';
import store from '../store';
import { resetStock } from '../store/slices/stock.slice';

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
    render(
        <Provider store={store}>
            <Catalog />
        </Provider>
    );

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

test(`Clicking add cumulative item adds to the  basket correctly `, async () => {
    store.dispatch(resetStock());
    const { getByTestId, getAllByText, queryByText } = render(
        <Provider store={store}>
            <Catalog />
        </Provider>
    );
    const buttonElement = getAllByText(/Add to basket/)[2];
    await waitFor(() => fireEvent.click(buttonElement));

    expect(queryByText(`You must select a size before adding to the basket`)).toBeInTheDocument();

    const dropDownElement = getByTestId(`dropdown`);
    await waitFor(() => fireEvent.change(dropDownElement, { target: { value: 1 } }));
    fireEvent.click(getAllByText(/Add to basket/)[2]);
    expect(store.getState().basket.contents.length).toEqual(3);
    expect(store.getState().basket.contents[2].qty).toEqual(1);
});

test(`Clicking add to basket correctly removes items from Redux store stock`, () => {
    render(
        <Provider store={store}>
            <Catalog />
        </Provider>
    );

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
