import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Basket, testInternalBasketMethods } from '../components';
import store from '../store';
import { add, addUpdateCumulative, resetBasket } from '../store/slices/basket.slice';
import { mockStore, mockInitialState, mockBasketContents, mockBasketItemsList, mockStateBasket, mockStateBasketSingle } from './mocks';

const { itemCount, parseBasketContents } = testInternalBasketMethods;

test(`renders items in basket button`, () => {
    store.dispatch(resetBasket());
    render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );
    expect(screen.getByText(/0 items in basket/)).toBeInTheDocument();
});

test(`renders empty basket message when basket empty`, async () => {
    store.dispatch(resetBasket());
    render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );
    await waitFor(() => fireEvent.click(screen.getByText(/items in basket/)));
    expect(screen.getByText(/Your basket is empty/)).toBeInTheDocument();
});

test(`renders expected bootstrap components`, () => {
    const store = mockStore(mockInitialState);
    const { container } = render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );
    expect(container.getElementsByClassName(`basket`).length).toBe(1);
});

test(`renders expected basket items from state`, async () => {
    const mockedStore = mockStore(mockStateBasket);
    render(
        <Provider store={mockedStore}>
            <Basket />
        </Provider>
    );

    expect(screen.getByText(/10 items in basket/)).toBeInTheDocument();
    await waitFor(() => fireEvent.click(screen.getByText(/10 items in basket/)));

    expect(screen.getAllByText(/Toilet Paper/)).toHaveLength(1);
    expect(screen.getAllByText(/Face Mask/)).toHaveLength(1);
    expect(screen.getAllByText(/Hand Sanitizer/)).toHaveLength(2);
});

test(`adds and removes discrete items from basket on button click`, async () => {
    store.dispatch(resetBasket());
    store.dispatch(add({ sku: `toiletPaper`, qty: 6, size: 1 }));

    render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );

    await waitFor(() => fireEvent.click(screen.getByText(/6 items in basket/)));
    await waitFor(() => fireEvent.click(screen.getByText(`-`)));
    expect(store.getState().basket.contents[0].qty).toEqual(5);
    await waitFor(() => fireEvent.click(screen.getByText(`+`)));
    expect(store.getState().basket.contents[0].qty).toEqual(6);
});

test(`adds and removes cumulative items from basket on button click`, async () => {
    store.dispatch(resetBasket());
    store.dispatch(addUpdateCumulative({ sku: `handSanitizer`, qty: 2, size: 0.175 }));
    store.dispatch(addUpdateCumulative({ sku: `handSanitizer`, qty: 2, size: 0.5 }));

    render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );

    await waitFor(() => fireEvent.click(screen.getByText(/items in basket/)));
    await waitFor(() => fireEvent.click(screen.getAllByText(`-`)[0]));
    expect(store.getState().basket.contents[0].packSizes[0].qty).toEqual(1);
    await waitFor(() => fireEvent.click(screen.getAllByText(`+`)[0]));
    expect(store.getState().basket.contents[0].packSizes[0].qty).toEqual(2);
});

test(`returns correct itemCount`, () => {
    expect(itemCount(mockBasketContents)).toEqual(10);
});

test(`returns parsed list of Basket Items`, () => {
    expect(parseBasketContents(mockBasketContents)).toEqual(mockBasketItemsList);
});
