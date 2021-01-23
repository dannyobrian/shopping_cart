import React from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { IoMdBasket } from 'react-icons/io';
import { StockItem } from '../../store/slices/stock.slice';
import { Products } from '../products';
import './basket.scss';
import { add, addUpdateCumulative, remove, removeUpdateCumulative } from '../../store/slices/basket.slice';
import { removeStock, returnStock } from '../../store/slices/stock.slice';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const itemCount = (contents: StockItem[]) =>
    contents.reduce((acc, curr: StockItem) => {
        if (curr.packSizes) {
            curr.packSizes.forEach(packSize => {
                acc += packSize.qty;
            });
            return acc;
        }
        return acc + curr.qty;
    }, 0);

const parseBasketContents = (contents: StockItem[]): BasketRowLineItem[] =>
    contents.reduce<BasketRowLineItem[]>((acc, curr) => {
        if (Products[curr.sku].display === `cumulative` && curr.packSizes) {
            return [
                ...acc,
                ...curr.packSizes.map(pack => ({
                    item: { sku: curr.sku, size: pack.size, qty: pack.qty },
                    cumulative: true,
                })),
            ];
        }
        return [...acc, { item: curr, cumulative: false }];
    }, []);

type BasketRowLineItem = {
    item: StockItem;
    cumulative: boolean;
};

export const Basket = () => {
    const dispatch = useDispatch();
    const { contents } = useTypedSelector((state: RootState) => state.basket);

    const addItem = (item: StockItem, cumulative: boolean): void => {
        if (cumulative) {
            dispatch(addUpdateCumulative(item));
        } else {
            dispatch(add(item));
        }
        dispatch(removeStock(item));
    };

    const removeItem = (item: StockItem, cumulative: boolean): void => {
        if (cumulative) {
            dispatch(removeUpdateCumulative(item));
        } else {
            dispatch(remove(item));
        }
        dispatch(returnStock(item));
    };

    const BasketRow = ({ item, cumulative }: BasketRowLineItem) => {
        const productNameString = !cumulative
            ? Products[item.sku].name
            : `${Products[item.sku].name} ${item.size}${Products[item.sku].packSizeID}`;
        return (
            <div className="basket-row">
                <div className="item-name">{productNameString}</div>
                <div className="item-qty">{`qty: ${item.qty}`}</div>
                <div>
                    <Button variant="link" onClick={() => removeItem({ sku: item.sku, size: item.size, qty: 1 }, cumulative)} size="sm">
                        -
                    </Button>
                </div>
                <div>
                    <Button variant="link" onClick={() => addItem({ sku: item.sku, size: item.size, qty: 1 }, cumulative)} size="sm">
                        +
                    </Button>
                </div>
            </div>
        );
    };

    const BasketContent = () => {
        return (
            <div>
                {contents.length > 0 ? (
                    parseBasketContents(contents).map(row => <BasketRow key={`basketItem_${row.item.sku}${row.item.size}`} {...row} />)
                ) : (
                    <div className="basket-row">Your basket is empty</div>
                )}
            </div>
        );
    };

    return (
        <div className="basket">
            <OverlayTrigger
                rootClose
                trigger="click"
                placement="bottom"
                transition={false}
                overlay={
                    <Popover id="basket-content">
                        <Popover.Title>Edit Basket</Popover.Title>
                        <Popover.Content>
                            <BasketContent />
                        </Popover.Content>
                    </Popover>
                }
            >
                <Button variant="primary">
                    <IoMdBasket />
                    {`  ${itemCount(contents)} items in basket`}
                </Button>
            </OverlayTrigger>
        </div>
    );
};

export const testInternalBasketMethods = {
    parseBasketContents,
    itemCount,
};
