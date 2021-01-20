import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Basket } from '../components';
import store from '../store';

test(`renders learn react link`, () => {
    render(
        <Provider store={store}>
            <Basket />
        </Provider>
    );
    const linkElement = screen.getByText(/Basket/i);
    expect(linkElement).toBeInTheDocument();
});
