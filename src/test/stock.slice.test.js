import reducer, { returnStock, removeStock, resetStock, initialState } from '../store/slices/stock.slice';

const mockResultState = {
    items: [
        { sku: `faceMask`, stock: [{ size: 1, qty: 100 }] },
        { sku: `toiletPaper`, stock: [{ size: 1, qty: 99 }] },
        {
            sku: `handSanitizer`,
            stock: [
                { size: 0.175, qty: 25 },
                { size: 0.25, qty: 25 },
                { size: 0.5, qty: 25 },
                { size: 1, qty: 25 },
            ],
        },
    ],
};

const mockResultStateSize = {
    items: [
        { sku: `faceMask`, stock: [{ size: 1, qty: 100 }] },
        { sku: `toiletPaper`, stock: [{ size: 1, qty: 100 }] },
        {
            sku: `handSanitizer`,
            stock: [
                { size: 0.175, qty: 25 },
                { size: 0.25, qty: 25 },
                { size: 0.5, qty: 24 },
                { size: 1, qty: 25 },
            ],
        },
    ],
};

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
        ).toEqual(mockResultState);

        expect(
            reducer(initialState, {
                type: removeStock.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.5,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateSize);
    });

    test(`it should return stock correctly`, () => {
        expect(
            reducer(mockResultState, {
                type: returnStock.type,
                payload: {
                    sku: `toiletPaper`,
                    size: 1,
                    qty: 1,
                },
            })
        ).toEqual(initialState);
        expect(
            reducer(mockResultStateSize, {
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
            reducer(mockResultState, {
                type: resetStock.type,
            })
        ).toEqual(initialState);
    });
});
