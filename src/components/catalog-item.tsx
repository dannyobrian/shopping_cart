import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Item } from './products';

type CatalogItemProps = Item & {
    onButtonClick: (sku: string) => void;
    sku: string;
};

export const CatalogItem = ({ sku, onButtonClick, name, unitValue, discountID }: CatalogItemProps) => {
    const onClickHandler = () => {
        onButtonClick(sku);
    };

    return (
        <div className="p-2">
            <Card>
                <Card.Header as="h5">{name}</Card.Header>
                <Card.Body className="text-start">
                    <Row>
                        <Col>
                            {discountID && <Card.Title>{discountID}</Card.Title>}
                            <Card.Text>£{unitValue.toFixed(2)}</Card.Text>
                        </Col>
                        <Col className="d-flex flex-row justify-content-end align-items-end p-2">
                            <Button onClick={onClickHandler}>Add to basket</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};
