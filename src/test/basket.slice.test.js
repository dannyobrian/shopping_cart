import reducer, {
    add,
    resetBasket,
    remove,
    removeUpdateCumulative,
    addUpdateCumulative,
    initialBasketState,
    nonExportedMethods,
} from '../store/slices/basket.slice';

const { updatePackSize, float } = nonExportedMethods;

const mockResultStateTP = {
    contents: [{ sku: `toiletPaper`, size: 1, qty: 1 }],
};

const mockResultStateTPFM = {
    contents: [
        { sku: `toiletPaper`, size: 1, qty: 1 },
        { sku: `faceMask`, size: 1, qty: 1 },
    ],
};

const mockResultStateTPFM2 = {
    contents: [
        { sku: `toiletPaper`, size: 1, qty: 1 },
        { sku: `faceMask`, size: 1, qty: 2 },
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

describe(`basket.slice internal functions`, () => {
    test(`updatePackSize function`, () => {
        expect(updatePackSize({ qty: 1, size: 1 }, [])).toEqual([{ qty: 1, size: 1 }]);

        expect(updatePackSize({ qty: 1, size: 1 }, [{ qty: 1, size: 1 }])).toEqual([{ qty: 2, size: 1 }]);

        expect(updatePackSize({ qty: 1, size: 1 }, [{ qty: 2, size: 1 }], false)).toEqual([{ qty: 1, size: 1 }]);

        expect(
            updatePackSize({ qty: 1, size: 2 }, [
                { qty: 2, size: 1 },
                { qty: 1, size: 2 },
            ])
        ).toEqual([
            { qty: 2, size: 1 },
            { qty: 2, size: 2 },
        ]);

        expect(
            updatePackSize(
                { qty: 1, size: 2 },
                [
                    { qty: 2, size: 1 },
                    { qty: 1, size: 2 },
                ],
                false
            )
        ).toEqual([{ qty: 2, size: 1 }]);
    });

    test(`float function`, () => {
        expect(float(2 * 0.175 + 0.85)).toEqual(1.2);
        expect(float(0.35 + 0.175)).toEqual(0.525);
    });
});

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

    test(`it should remove indiviudal items from the basket correctly`, () => {
        expect(
            reducer(mockResultStateTP, {
                type: remove.type,
                payload: {
                    sku: `toiletPaper`,
                    size: 1,
                    qty: 1,
                },
            })
        ).toEqual(initialBasketState);

        expect(
            reducer(mockResultStateTPFM, {
                type: remove.type,
                payload: {
                    sku: `faceMask`,
                    size: 1,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTP);

        expect(
            reducer(mockResultStateTPFM2, {
                type: remove.type,
                payload: {
                    sku: `faceMask`,
                    size: 1,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTPFM);

        expect(
            reducer(mockResultStateTPFMHS, {
                type: removeUpdateCumulative.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.175,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTPFM);
    });

    test(`it should update items with multiple packSizes correctly when adding`, () => {
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

    test(`it should update items with multiple packSizes correctly when removing`, () => {
        expect(
            reducer(mockResultStateTPFMHS3, {
                type: removeUpdateCumulative.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.175,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTPFMHS2);

        expect(
            reducer(mockResultStateTPFMHS2, {
                type: removeUpdateCumulative.type,
                payload: {
                    sku: `handSanitizer`,
                    size: 0.5,
                    qty: 1,
                },
            })
        ).toEqual(mockResultStateTPFMHS);
    });

    test(`it should empty the basket correctly`, () => {
        expect(
            reducer(mockResultStateTPFMHS3, {
                type: resetBasket.type,
            })
        ).toEqual(initialBasketState);
    });
});
