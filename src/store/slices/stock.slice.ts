import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockItem, StockUnit } from '../../components';

export type StockStatePart = {
    stock: StockState;
};

export type StockState = {
    items: StockUnit[];
};

export const initialState: StockState = {
    items: [
        {
            sku: `faceMask`,
            stock: [
                {
                    size: 1,
                    qty: 100,
                },
            ],
        },
        {
            sku: `toiletPaper`,
            stock: [
                {
                    size: 1,
                    qty: 100,
                },
            ],
        },
        {
            sku: `handSanitizer`,
            stock: [
                {
                    size: 0.175,
                    qty: 25,
                },
                {
                    size: 0.25,
                    qty: 25,
                },
                {
                    size: 0.5,
                    qty: 25,
                },
                {
                    size: 1,
                    qty: 25,
                },
            ],
        },
    ],
};

const stockSlice = createSlice({
    name: `stock`,
    initialState,
    reducers: {
        returnStock: (state, { payload }: PayloadAction<StockItem>) => {
            const { sku, size, qty } = payload;
            state.items.map(item => {
                if (item.sku === sku) {
                    item.stock = item.stock.map(pack => (pack.size === size ? { ...pack, qty: pack.qty + qty } : pack));
                }
                return item;
            });
        },
        removeStock: (state, { payload }: PayloadAction<StockItem>) => {
            const { sku, size, qty } = payload;
            state.items = state.items.map(item => {
                if (item.sku === sku) {
                    item.stock = item.stock.map(pack => (pack.size === size ? { ...pack, qty: pack.qty - qty } : pack));
                }
                return item;
            });
        },
        resetStock: state => ({
            ...initialState,
        }),
    },
});

export const { returnStock, removeStock, resetStock } = stockSlice.actions;
export default stockSlice.reducer;
