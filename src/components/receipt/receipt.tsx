import React from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import { RootState } from '../../store';
import { StockItem } from '../stock';
import { Products, Item } from '../products';
import './receipt.scss';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Receipt = () => {
    const { contents: basketContents } = useTypedSelector((state: RootState) => state.basket);

    const pricePerUnit = (item: StockItem): number => {
        const product: Item = Products[item.sku];
        if (product.display === `cumulative`) {
            return product.unitValue * item.size;
        }
        return product.unitValue;
    };

    const itemNetTotal = (qty: number, product: Item) => {
        const { priceBreak, unitValue, discount } = product;
        if (priceBreak && discount) {
            const modifier = Math.floor(qty / priceBreak);
            const remainder = (qty % priceBreak) * unitValue;
            return unitValue * priceBreak * modifier * (1 - discount) + remainder;
        }
        return unitValue * qty;
    };

    const itemDiscount = (qty: number, product: Item) => {
        return (product.unitValue * qty - itemNetTotal(qty, product)) * -1;
    };

    const netTotal: number = basketContents.reduce((acc, curr) => {
        const product: Item = Products[curr.sku];
        const { display } = product;
        const { qty } = curr;

        if (display === `cumulative`) {
            // priced per percentage of unit amount e.g. per/l
            return acc + curr.qty * pricePerUnit(curr);
        }
        // priced per unit with discount applied if necessary
        return acc + itemNetTotal(qty, product);
    }, 0);

    const subTotal: number = basketContents.reduce((acc, curr) => {
        const product: Item = Products[curr.sku];
        const { display } = product;

        if (display === `cumulative`) {
            // priced per percentage of unit amount e.g. per/l
            return acc + curr.qty * pricePerUnit(curr);
        }
        return acc + product.unitValue * curr.qty;
    }, 0);

    const totalSavings: number = (subTotal - netTotal) * -1;

    const formatAmount = (val: number): string => val.toFixed(2);

    type LineItem = {
        name: string;
        value: string;
        unitValue?: number;
        packSizeID?: string;
        size?: number;
    };

    const receiptLineItems: LineItem[] = [];
    basketContents.forEach(item => {
        const product: Item = Products[item.sku];
        const { display, name, unitValue, packSizeID } = product;
        if (display === `discrete`) {
            for (let n = 0; n < item.qty; n++) {
                receiptLineItems.push({ name, value: formatAmount(unitValue) });
            }
        } else {
            receiptLineItems.push({
                name,
                value: formatAmount(item.size * unitValue),
                unitValue,
                packSizeID,
                size: item.size,
            });
        }
    });

    const savings: LineItem[] = basketContents.reduce<LineItem[]>((acc, curr) => {
        const product = Products[curr.sku];
        const { name: productName, discount, discountID, priceBreak } = product;
        if (discount && discountID && priceBreak && curr.qty >= priceBreak) {
            acc.push({
                name: `${productName} ${product.discountID}`,
                value: itemDiscount(curr.qty, product).toFixed(2),
            });
        }
        return acc;
    }, []);

    const ReceiptRow = ({ item }: { item: LineItem }) => (
        <div className="receipt-row line-item">
            <div className="receipt-row-title">{item.name}</div>
            <div className="receipt-row-value">{item.value}</div>
        </div>
    );

    const ReceiptDetailRow = ({ item }: { item: LineItem }) => (
        <>
            <div className="receipt-row line-item">
                <div className="receipt-row-title">{item.name}</div>
            </div>
            <div className="receipt-row line-item">
                <div className="receipt-row-breakdown">
                    {item.size && `${item.size.toFixed(3)} ${item.packSizeID} @ ${item.unitValue} / ${item.packSizeID}`}
                </div>
                <div className="receipt-row-value">{item.value}</div>
            </div>
        </>
    );

    return (
        <Card className="receipt mt-2">
            <Card.Body>
                {receiptLineItems.map((item, index) => (
                    <div key={`lineItem${index}`}>
                        {item.unitValue && item.size ? (
                            <ReceiptDetailRow item={item} />
                        ) : (
                            <ReceiptRow key={`lineItem${index}`} item={item} />
                        )}
                    </div>
                ))}
                {receiptLineItems.length > 0 && <div className="receipt-row sub-separator" />}
                <ReceiptRow item={{ name: `Subtotal`, value: formatAmount(subTotal) }} />
                {savings.length > 0 && (
                    <>
                        <ReceiptRow item={{ name: `Savings`, value: `` }} />
                        <div className="receipt-row sub-separator" />
                    </>
                )}
                {savings.length > 0 &&
                    savings.map((saving, index) => <ReceiptRow key={`saving${index}`} item={saving} />)}
                {savings.length > 0 && (
                    <ReceiptRow item={{ name: `Total Savings`, value: formatAmount(totalSavings) }} />
                )}
                <div className="receipt-row separator" />
                <ReceiptRow item={{ name: `Total to pay`, value: formatAmount(netTotal) }} />
            </Card.Body>
        </Card>
    );
};
