import React from 'react';
import { Provider } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import { Basket, Catalog, Receipt } from './components';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <div className="App p-4">
                <Container>
                    <Row className="basketRow d-flex w-100 justify-content-end">
                        <Basket />
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Catalog />
                        </Col>
                        <Col sm="5" md="4">
                            <Receipt />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Provider>
    );
};
//
export default App;
