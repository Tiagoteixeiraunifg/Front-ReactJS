import React from 'react';
import { Container, Button,  Col, Image, Row, Card } from 'react-bootstrap'


export const HomePrincipal = () => {

    return (
        <div className="auth-wrapper">
            <div className="auth-inner-cli">
                <Container className="mb-8">
                    <Row form>
                        <Col>
                            <h1> Olá! </h1>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        <p>Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                        <br />
                                        <p>Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        <p>Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                        <br />
                                        <p>Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                            <br />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );

}

