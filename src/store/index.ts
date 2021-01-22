import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import BasketReducer, { BasketStatePart } from './slices/basket.slice';
import StockReducer, { StockStatePart } from './slices/stock.slice';

export type RootState = BasketStatePart & StockStatePart;

const isDev = process.env.NODE_ENV === `development`;

const store = configureStore({
    reducer: {
        basket: BasketReducer,
        stock: StockReducer,
    },
    middleware: getDefaultMiddleware => (isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()),
    devTools: isDev,
});

export default store;
