import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Item } from './products';

type CatalogItemProps = Item & {
    onButtonClick: (sku: string, size: number) => void;
    sku: string;
};

export const CatalogItem = ({
    sku,
    onButtonClick,
    name,
    unitValue,
    discountID,
    packSizes,
    packSizeID,
    packSizeSuffix,
}: CatalogItemProps) => {
    const onClickHandler = () => {
        if (packSizeIndex !== undefined) {
            onButtonClick(sku, packSizes[packSizeIndex]);
        } else {
            setError(true);
        }
    };

    const [packSizeIndex, setPackSizeIndex] = useState<number | undefined>(packSizes.length > 1 ? undefined : 0);
    const [error, setError] = useState<boolean>(false);

    const handlePackSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value) {
            setError(false);
            setPackSizeIndex(Number(e.currentTarget.value));
        }
    };

    return (
        <div className="p-2 catalogItem">
            <Card>
                <Card.Header as="h5">{name}</Card.Header>
                <Card.Body className="text-start">
                    <Row>
                        <Col>
                            {discountID && <Card.Title>{discountID}</Card.Title>}
                            <Card.Text>
                                £{unitValue.toFixed(2)}
                                {` ${packSizeSuffix}`}
                            </Card.Text>
                            {packSizes.length > 1 && (
                                <Form.Control as="select" onChange={handlePackSizeChange}>
                                    <option>Select size:</option>
                                    {packSizes.map((item, index) => (
                                        <option value={index} key={`sizeOption${index}`}>
                                            {item}
                                            {packSizeID}
                                        </option>
                                    ))}
                                </Form.Control>
                            )}
                            {error && <div className="error">You must select a size before adding to the basket</div>}
                        </Col>
                        <Col className="d-flex flex-row justify-content-end align-items-end p-2">
                            <Button onClick={() => onClickHandler()}>Add to basket</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};
