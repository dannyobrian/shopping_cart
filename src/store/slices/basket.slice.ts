import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackSize, StockItem } from '../../components/stock';

export type BasketStatePart = {
    basket: BasketState;
};

type BasketState = {
    contents: StockItem[];
};

export const initialBasketState: BasketState = {
    contents: [],
};

/* 
//example state 
state = [
    { sku: `faceMask`, size: 1, qty: 1 },
    { sku: `toiletPaper`, size: 1, qty: 1 },
    { sku: `handSanitizer`, size: 0.175, qty: 1, packSizes: [{ size: 0.175, qty: 1 }] },
 ]
 */

// updates the quantity of discrete anounts of cumulative products (e.g. hand sanitizer)
const updatePackSize = (item: StockItem, packSizes: PackSize[], add = true): PackSize[] => {
    const multiplier: number = add ? 1 : -1;
    const packIndex = packSizes.findIndex(pack => pack.size === item.size);

    if (add && packIndex < 0) {
        packSizes.push({ size: item.size, qty: item.qty });
        return packSizes;
    }

    return packSizes.reduce<PackSize[]>((acc: PackSize[], curr: PackSize) => {
        if (curr.size === item.size) {
            const updatedQty = curr.qty + item.qty * multiplier;
            if (updatedQty > 0) {
                return [...acc, { size: item.size, qty: updatedQty }];
            }
            return acc;
        }
        return [...acc, curr];
    }, []);
};

const basketSlice = createSlice({
    name: `basket`,
    initialState: initialBasketState,
    reducers: {
        add: (state, { payload }: PayloadAction<StockItem>) => {
            const { sku, size, qty } = payload;
            const arrayIndex = state.contents.findIndex(item => item.sku === sku && item.size === size);

            if (arrayIndex < 0) {
                state.contents.push(payload);
            } else {
                state.contents = state.contents.map((item, index) => {
                    return index === arrayIndex ? { sku, size, qty: item.qty + qty } : item;
                });
            }
        },
        addUpdateCumulative: (state, { payload }: PayloadAction<StockItem>) => {
            const { sku, size, qty } = payload;
            const arrayIndex = state.contents.findIndex(item => item.sku === sku);

            if (arrayIndex < 0) {
                state.contents.push({ ...payload, packSizes: [{ size, qty }] });
            } else {
                state.contents = state.contents.map((item, index) => {
                    return index === arrayIndex && item.packSizes
                        ? {
                              sku,
                              // cludge to eradicate the dreaded 00000000000001 precsiion error when adding floats
                              size: Number((size * qty + item.size).toPrecision(3)),
                              qty: 1,
                              packSizes: updatePackSize(payload, item.packSizes, true),
                          }
                        : item;
                });
            }
        },
        remove: (state, { payload }: PayloadAction<StockItem>) => {
            const { qty, sku, size } = payload;
            state.contents = state.contents.reduce<StockItem[]>((acc, curr) => {
                if (curr.sku === sku && curr.size === size) {
                    if (curr.qty - qty > 0) {
                        return [...acc, { sku, size, qty: curr.qty - qty }];
                    }
                    return acc;
                }
                return [...acc, curr];
            }, []);
        },
        removeUpdateCumulative: (state, { payload }: PayloadAction<StockItem>) => {
            const { qty, sku, size } = payload;
            state.contents = state.contents.reduce<StockItem[]>((acc, curr) => {
                if (curr.sku === sku) {
                    if (curr.size - size > 0 && curr.packSizes) {
                        return [
                            ...acc,
                            {
                                sku,
                                size: Number((curr.size - size).toPrecision(3)),
                                qty,
                                packSizes: updatePackSize(payload, curr.packSizes, false),
                            },
                        ];
                    }
                    return acc;
                }
                return [...acc, curr];
            }, []);
        },
        resetBasket: () => ({
            ...initialBasketState,
        }),
    },
});

export const { add, addUpdateCumulative, remove, removeUpdateCumulative, resetBasket } = basketSlice.actions;
export default basketSlice.reducer;
