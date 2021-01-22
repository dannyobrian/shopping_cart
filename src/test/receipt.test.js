import React from 'react';
import { render, screen } from '@testing-library/react';
import { Receipt } from '../components';
import { Provider } from 'react-redux';
import store from '../store';

test(`renders Receipt component`, () => {
    const { container } = render(
        <Provider store={store}>
            <Receipt />
        </Provider>
    );
    expect(container.getElementsByClassName(`receipt`)).toHaveLength(1);
});

test(`renders Receipt component`, () => {
    render(
        <Provider store={store}>
            <Receipt />
        </Provider>
    );
    expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
    expect(screen.getByText(/Total to pay/)).toBeInTheDocument();
});
