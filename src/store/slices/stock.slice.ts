import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockItem, Stock, StockUnit } from '../../components';

export type StockStatePart = {
    stock: StockState;
};

export type StockState = {
    stock: StockUnit[];
};

const initialState: StockState = {
    stock: Stock,
};

const performStockAction = (state: StockState, payload: StockItem, add = true) => {
    const increment: number = add ? 1 : -1;
    const { sku, size, qty } = payload;
    return state.stock.map((item) => {
        if (item.sku === sku) {
            item.stock = item.stock.map((pack) =>
                pack.size === size ? { ...pack, qty: pack.qty + qty * increment } : pack
            );
        }
        return item;
    });
};

const stockSlice = createSlice({
    name: `stock`,
    initialState,
    reducers: {
        returnStock: (state, { payload }: PayloadAction<StockItem>) => {
            state.stock = performStockAction(state, payload);
        },
        removeStock: (state, { payload }: PayloadAction<StockItem>) => {
            state.stock = performStockAction(state, payload, false);
        },
    },
});

const { reducer, actions } = stockSlice;
const { returnStock, removeStock } = actions;
export { reducer as StockReducer, returnStock, removeStock };
