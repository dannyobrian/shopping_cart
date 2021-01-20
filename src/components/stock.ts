export type PackSize = {
    size: number;
    qty: number;
};

export type StockItem = PackSize & {
    sku: string;
};

export type StockUnit = {
    sku: string;
    stock: PackSize[];
};

export const Stock: StockUnit[] = [
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
];
