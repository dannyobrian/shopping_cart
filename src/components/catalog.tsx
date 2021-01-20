import React from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Products } from './products';
import { CatalogItem } from './catalog-item';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Catalog = () => {
    const { stock } = useTypedSelector((state: RootState) => state.stock);

    const onButtonClickHandler = () => {
        console.log(`catalog.onButtonClickHandler`);
    };

    return (
        <div className="catalogItem">
            <div>Catalog</div>
            {stock.map((item) => (
                <CatalogItem
                    sku={item.sku}
                    onButtonClick={onButtonClickHandler}
                    key={`${item.sku}_catalogItem`}
                    {...Products[item.sku]}
                />
            ))}
        </div>
    );
};
