import React from 'react';
import { Container, Button, ButtonGroup, Col, Image, Row, Card } from 'react-bootstrap'


export const HomePrincipal = () => {

    return (
        <Container>
            <div className="img-inicio">

                <Row>
                    <Col>
                    <h1> Olá! </h1>
                    </Col>    
                </Row>
                <Row>
                <Col>
                    <br />
                    <Card style={{ width: '25rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card style={{ width: '25rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <br />
                </Col>
                </Row>
            </div>
        </Container>
    );

}

