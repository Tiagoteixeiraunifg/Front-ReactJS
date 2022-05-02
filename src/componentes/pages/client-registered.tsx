
import React from 'react';
import { Container, Row, Col, Table, ButtonGroup, Button } from 'react-bootstrap';

export const TabelaCliente = () => {

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="img-inicio">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="secondary">Left</Button>
                                        <Button variant="secondary">Middle</Button>
                                        <Button variant="secondary">Right</Button>
                                    </ButtonGroup>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan={2}>Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    <div className="row">
                    <ButtonGroup>
                        <Button type="button"> Fechar </Button>
                        </ButtonGroup>  
                    </div>
                    </div>
                   
                </Col>
            </Row>
        </Container>
    );

}