import configureStore from 'redux-mock-store';
export const mockStore = configureStore([]);

export const mockInitialState = {
    basket: {
        contents: [],
    },
    stock: {
        items: [],
    },
};

export const mockBasketContents = [
    { sku: `toiletPaper`, size: 1, qty: 6 },
    { sku: `faceMask`, size: 1, qty: 2 },
    {
        sku: `handSanitizer`,
        size: 0.675,
        qty: 1,
        packSizes: [
            { size: 0.175, qty: 1 },
            { size: 0.5, qty: 1 },
        ],
    },
];
export const mockBasketContentsSingle = [{ sku: `toiletPaper`, size: 1, qty: 6 }];

const mockStateStock = {
    items: [
        { sku: `faceMask`, stock: [{ size: 1, qty: 96 }] },
        { sku: `toiletPaper`, stock: [{ size: 1, qty: 97 }] },
        {
            sku: `handSanitizer`,
            stock: [
                { size: 0.175, qty: 24 },
                { size: 0.25, qty: 25 },
                { size: 0.5, qty: 25 },
                { size: 1, qty: 25 },
            ],
        },
    ],
};

const mockStateStockSingle = {
    items: [{ sku: `toiletPaper`, stock: [{ size: 1, qty: 97 }] }],
};

export const mockStockResultState = {
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

export const mockStockResultStateSize = {
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

export const mockStateBasket = {
    basket: {
        contents: [...mockBasketContents],
    },
    stock: { ...mockStateStock },
};

export const mockStateBasketSingle = {
    basket: {
        contents: [...mockBasketContentsSingle],
    },
    stock: { ...mockStateStockSingle },
};

export const mockState = {
    basket: {
        contents: [...mockBasketContents],
    },
    stock: {
        items: [
            { sku: `faceMask`, stock: [{ size: 1, qty: 96 }] },
            { sku: `toiletPaper`, stock: [{ size: 1, qty: 97 }] },
            {
                sku: `handSanitizer`,
                stock: [
                    { size: 0.175, qty: 24 },
                    { size: 0.25, qty: 25 },
                    { size: 0.5, qty: 25 },
                    { size: 1, qty: 25 },
                ],
            },
        ],
    },
};

export const mockDiscreteStockItem = { sku: `toiletPaper`, size: 1, qty: 6 };
export const mockCumulativeStockItem = {
    sku: `handSanitizer`,
    size: 0.675,
    qty: 1,
    packSizes: [
        { size: 0.175, qty: 1 },
        { size: 0.5, qty: 1 },
    ],
};

export const mockBasketItemsList = [
    { cumulative: false, item: { qty: 6, size: 1, sku: `toiletPaper` } },
    { cumulative: false, item: { qty: 2, size: 1, sku: `faceMask` } },
    { cumulative: true, item: { qty: 1, size: 0.175, sku: `handSanitizer` } },
    { cumulative: true, item: { qty: 1, size: 0.5, sku: `handSanitizer` } },
];

export const mockSavingsResult = [
    { name: `Toilet Paper (6 for price of 5)`, value: `-0.65` },
    { name: `Face Mask (2 for £4)`, value: `-1.00` },
];

export const mockBasketLineItems = [
    {
        name: `Toilet Paper`,
        value: `0.65`,
    },
    {
        name: `Toilet Paper`,
        value: `0.65`,
    },
    {
        name: `Toilet Paper`,
        value: `0.65`,
    },
    {
        name: `Toilet Paper`,
        value: `0.65`,
    },
    {
        name: `Toilet Paper`,
        value: `0.65`,
    },
    {
        name: `Toilet Paper`,
        value: `0.65`,
    },
    {
        name: `Face Mask`,
        value: `2.50`,
    },
    {
        name: `Face Mask`,
        value: `2.50`,
    },
    {
        name: `Hand Sanitizer`,
        packSizeID: `l`,
        size: 0.675,
        unitValue: 19.99,
        value: `13.49`,
    },
];
