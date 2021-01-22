import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Basket } from '../../components';
import store from '../../store';
import { resetBasket } from '../../store/slices/basket.slice';

test(`renders learn react link`, () => {
    store.dispatch(resetBasket());
    render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );
    const linkElement = screen.getByText(/items in basket/);
    expect(linkElement).toBeInTheDocument();
});
test(`renders expected bootstrap compoenents`, () => {
    const { container } = render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );
    expect(container.getElementsByClassName(`basket`).length).toBe(1);
});
