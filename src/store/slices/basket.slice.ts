import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockItem } from '../../components/stock';

export type BasketStatePart = {
    basket: BasketState;
};

export type BasketState = {
    basket: StockItem[];
};

const initialState: BasketState = {
    basket: [],
};

/* 
//example state 
state = [
    {sku: 'toiletPaper', size: 1, qty: 1}
    {sku: 'faceMask', size: 1, qty: 1}
    {sku: 'handSanitizer', size: 0.25, qty: 1},
    {sku: 'handSanitizer', size: 0.5, qty: 1}
 ]
 */

const basketSlice = createSlice({
    name: `basket`,
    initialState,
    reducers: {
        add: (state, { payload }: PayloadAction<StockItem>) => {
            const { sku, size, qty } = payload;
            const arrayIndex = state.basket.findIndex((item) => item.sku === sku && item.size === size);
            if (!arrayIndex) {
                state.basket.push(payload);
            } else {
                state.basket = state.basket.map((item, index) => {
                    return index === arrayIndex ? { sku, size, qty: item.qty + qty } : item;
                });
            }
        },
        remove: (state, { payload }: PayloadAction<StockItem>) => {
            const { qty, sku, size } = payload;
            state.basket = state.basket.reduce<StockItem[]>((acc, curr) => {
                if (curr.sku === sku && curr.size === size) {
                    if (curr.qty - qty > 0) {
                        return [...acc, { sku, size, qty: curr.qty - qty }];
                    }
                    return acc;
                }
                return [...acc, curr];
            }, []);
        },
    },
});

const { reducer, actions } = basketSlice;
const { add, remove } = actions;
export { reducer as BasketReducer, add, remove };
