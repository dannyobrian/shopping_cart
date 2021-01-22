import reducer, {
    add,
    resetBasket,
    remove,
    removeUpdateCumulative,
    addUpdateCumulative,
    initialBasketState,
} from '../store/slices/basket.slice';

const mockResultStateTP = {
    contents: [{ sku: `toiletPaper`, size: 1, qty: 1 }],
};

const mockResultStateTPFM = {
    contents: [
        { sku: `toiletPaper`, size: 1, qty: 1 },
        { sku: `faceMask`, size: 1, qty: 1 },
    ],
};

const mockResultStateTPFMHS = {
    contents: [
        { sku: `toiletPaper`, size: 1, qty: 1 },
        { sku: `faceMask`, size: 1, qty: 1 },
        { sku: `handSanitizer`, size: 0.175, qty: 1, packSizes: [{ size: 0.175, qty: 1 }] },
    ],
};

const mockResultStateTPFMHS2 = {
    contents: [
        { sku: `toiletPaper`, size: 1, qty: 1 },
        { sku: `faceMask`, size: 1, qty: 1 },
        {
            sku: `handSanitizer`,
            size: 0.675,
            qty: 1,
            packSizes: [
                { size: 0.175, qty: 1 },
                { size: 0.5, qty: 1 },
            ],
        },
    ],
};

const mockResultStateTPFMHS3 = {
    contents: [
        { sku: `toiletPaper`, size: 1, qty: 1 },
        { sku: `faceMask`, size: 1, qty: 1 },
        {
            sku: `handSanitizer`,
            size: 0.85,
            qty: 1,
            packSizes: [
                { size: 0.175, qty: 2 },
                { size: 0.5, qty: 1 },
            ],
        },
    ],
};

describe(`basket.slice reducer`, () => {
    test(`should handle initial state`, () => {
        expect(reducer(undefined, {})).toEqual(initialBasketState);
    });

    test(`it should add to basket correctly`, () => {
        expect(
            reducer(initialBasketState, {
                type: add.type,
                payload: {
                    sku: `toiletPaper`,
                    size: 1,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTP);

        expect(
            reducer(mockResultStateTP, {
                type: add.type,
                payload: {
                    sku: `faceMask`,
                    size: 1,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTPFM);

        expect(
            reducer(mockResultStateTPFM, {
                type: addUpdateCumulative.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.175,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTPFMHS);
    });

    test(`it should upodate items with multiple packSizes correctly`, () => {
        expect(
            reducer(mockResultStateTPFMHS, {
                type: addUpdateCumulative.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.5,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTPFMHS2);

        expect(
            reducer(mockResultStateTPFMHS2, {
                type: addUpdateCumulative.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.175,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTPFMHS3);
    });
});

//             basket: {
//                 contents: [
//                     { sku: `faceMask`, size: 1, qty: 1 },
//                     { sku: `toiletPaper`, size: 1, qty: 1 },
//                 ],
//             },
//         },
//         { type: `basket/addUpdateCumulative`, payload: { sku: `handSanitizer`, size: 0.175, qty: 1 } }
//     );
//     expect(state).toEqual({
//         basket: {
//             contents: [
//                 { sku: `faceMask`, size: 1, qty: 1 },
//                 { sku: `toiletPaper`, size: 1, qty: 1 },
//                 { sku: `handSanitizer`, size: 0.175, qty: 1, packSizes: [{ size: 0.175, qty: 1 }] },
//             ],
//         },
//         stock: {
//             items: [
//                 { sku: `faceMask`, stock: [{ size: 1, qty: 99 }] },
//                 { sku: `toiletPaper`, stock: [{ size: 1, qty: 99 }] },
//                 {
//                     sku: `handSanitizer`,
//                     stock: [
//                         { size: 0.175, qty: 24 },
//                         { size: 0.25, qty: 25 },
//                         { size: 0.5, qty: 25 },
//                         { size: 1, qty: 25 },
//                     ],
//                 },
//             ],
//         },
//     });
// });

// {
//     basket: { contents: [{ sku: `faceMask`, size: 1, qty: 1 }] },
// },
// { type: `basket/add`, payload: { sku: `toiletPaper`, size: 1, qty: 1 } }

// expect(state).toEqual({
//         basket: {
//             contents: [
//                 { sku: `faceMask`, size: 1, qty: 1 },
//                 { sku: `toiletPaper`, size: 1, qty: 1 },
//             ],
//         },
//         stock: {
//             items: [
//                 { sku: `faceMask`, stock: [{ size: 1, qty: 99 }] },
//                 { sku: `toiletPaper`, stock: [{ size: 1, qty: 99 }] },
//                 {
//                     sku: `handSanitizer`,
//                     stock: [
//                         { size: 0.175, qty: 25 },
//                         { size: 0.25, qty: 25 },
//                         { size: 0.5, qty: 25 },
//                         { size: 1, qty: 25 },
//                     ],
//                 },
//             ],
//         },
//     });
// });
