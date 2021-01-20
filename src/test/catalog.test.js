import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Catalog } from '../components';
import store from '../store';

test(`renders Catalog component`, () => {
    render(
        <Provider store={store}>
            <Catalog />
        </Provider>
    );
    const linkElement = screen.getByText(/Catalog/i);
    expect(linkElement).toBeInTheDocument();
});
