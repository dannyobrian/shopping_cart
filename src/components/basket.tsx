import React from 'react';
import { Button } from 'react-bootstrap';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Basket = () => {
    const { basket } = useTypedSelector((state: RootState) => state.basket);

    return (
        <div className="basket">
            <Button>{`${basket.length} items in basket`}</Button>
        </div>
    );
};
