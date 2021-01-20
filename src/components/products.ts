export type Item = {
    name: string;
    unitValue: number;
    packSizes: number[];
    display: `cumulative` | `discrete`;
    packSizeID?: string;
    priceBreak?: number;
    discount?: number;
    discountID?: string;
};

export type SKUList = {
    [key: string]: Item;
};

export const Products: SKUList = {
    faceMask: {
        name: `Face Mask`,
        unitValue: 2.5,
        packSizes: [1],
        priceBreak: 2,
        discount: 0.2,
        discountID: `(2 for £4)`,
        display: `discrete`,
    },
    toiletPaper: {
        name: `Toilet Paper`,
        unitValue: 0.65,
        packSizes: [1],
        priceBreak: 6,
        discount: 0.1667,
        discountID: `(6 for the price of 5)`,
        display: `discrete`,
    },
    handSanitizer: {
        name: `Hand Sanitizer`,
        unitValue: 19.99,
        packSizes: [0.175, 0.25, 0.5, 1],
        packSizeID: `l`,
        display: `cumulative`,
    },
};
