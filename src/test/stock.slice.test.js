import reducer, { returnStock, removeStock, resetStock, initialState } from '../store/slices/stock.slice';
import { mockStockResultState, mockStockResultStateSize } from './mocks';

describe(`stock.slice reducer`, () => {
    test(`should handle initial state`, () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    test(`it should remove stock correctly`, () => {
        expect(
            reducer(initialState, {
                type: removeStock.type,
                payload: {
                    sku: `toiletPaper`,
                    size: 1,
                    qty: 1,
                },
            })
        ).toEqual(mockStockResultState);

        expect(
            reducer(initialState, {
                type: removeStock.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.5,
                    qty: 1,
                },
            })
        ).toEqual(mockStockResultStateSize);
    });

    test(`it should return stock correctly`, () => {
        expect(
            reducer(mockStockResultState, {
                type: returnStock.type,
                payload: {
                    sku: `toiletPaper`,
                    size: 1,
                    qty: 1,
                },
            })
        ).toEqual(initialState);
        expect(
            reducer(mockStockResultStateSize, {
                type: returnStock.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.5,
                    qty: 1,
                },
            })
        ).toEqual(initialState);
    });

    test(`it should reset stock when requested`, () => {
        expect(
            reducer(mockStockResultState, {
                type: resetStock.type,
            })
        ).toEqual(initialState);
    });
});
