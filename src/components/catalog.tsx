import React from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Products } from './products';
import { CatalogItem } from './catalog-item';
import { add, addUpdateCumulative } from '../store/slices/basket.slice';
import { removeStock } from '../store/slices/stock.slice';
import { StockItem } from './stock';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Catalog = () => {
    const dispatch = useDispatch();
    const { items } = useTypedSelector((state: RootState) => state.stock);

    const onButtonClickHandler = (sku: string, size: number, qty = 1) => {
        const { display } = Products[sku];
        const item: StockItem = { sku, size, qty };
        dispatch(removeStock(item));
        if (display === `discrete`) {
            dispatch(add(item));
            return;
        }
        dispatch(addUpdateCumulative(item));
    };

    return (
        <div className="catalog">
            {items ? (
                items.map(item => (
                    <CatalogItem
                        sku={item.sku}
                        onButtonClick={onButtonClickHandler}
                        key={`${item.sku}_catalogItem`}
                        {...Products[item.sku]}
                    />
                ))
            ) : (
                <div>No stock found</div>
            )}
        </div>
    );
};
