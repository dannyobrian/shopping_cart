import { configureStore } from '@reduxjs/toolkit';
import { BasketStatePart, BasketReducer } from './slices/basket.slice';
import { StockStatePart, StockReducer } from './slices/stock.slice';

export type RootState = BasketStatePart & StockStatePart;

const store = configureStore({
    reducer: {
        basket: BasketReducer,
        stock: StockReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV === `development`,
});

export default store;
