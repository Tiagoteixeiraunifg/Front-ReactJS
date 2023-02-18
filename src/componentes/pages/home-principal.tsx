import React from 'react';
import { Container, Button, Col, Image, Row, Card, Carousel } from 'react-bootstrap';


export const HomePrincipal = () => {

    return (

        <div className="auth-wrapper">
            <div className="auth-inner-cli">
                <Container className="md-12 mb-5">
                    <Row form className='mb-5'>
                        <Col>
                            <h1> Olá, seja bem vindo ao nosso projeto!  </h1>
                            </Col>
                    </Row>
                    <Row form >
                        <Col md="12" className='mb-3'>
                        <Card>
                            <Card.Body>
                                   {/* <Card.Title><h3>Logomarcas</h3></Card.Title>*/}
                                <Carousel fade variant='dark' className="carrousel">
                                {/*SPRING*/}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoSpringBoot.png"
                                        alt="Spring"
                                    />
                                </Carousel.Item>
                                {/*JAVA */}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoJava.jpg"
                                        alt="Java"
                                    />
                                </Carousel.Item>
                                {/*AWS AMPLIFY */}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoAwsAmplify.jpg"
                                        alt="AwsAmplify"
                                    />
                                </Carousel.Item>
                                {/*AWS RDS */}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoAwsRDS.png"
                                        alt="Java"
                                    />
                                </Carousel.Item>
                                {/*REACT JS*/}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoReact.png"
                                        alt="ReactJS"
                                    />
                                </Carousel.Item>
                                {/*TYPESCRIPT */}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoTypescript.png"
                                        alt="Typescript"
                                    />
                                </Carousel.Item>
                                {/*Bootstrap*/}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoBootstrap.png"
                                        alt="Bootstrap"
                                    />
                                </Carousel.Item>
                            </Carousel>
                                    <Card.Text>
                                        {/*<p>Tecnologias usadas pra o desenvolvimento do projeto A3</p>*/}
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </Col>
                        <br />
                        <Col md="12" className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title><h3>Desenvolvimento</h3></Card.Title>
                                    <Card.Text>
                                        <p>Tecnologias utilizadas para o front-end; ReactJS, Typescript, Bootstrap, MaterialUI,
                                            Bootstrap Icons, FontAwesome, Icons, React-Bootstrap.  </p>
                                        <br />
                                        <p>Tecnologias utilizadas para o back-end; Java, Framwork Spring, Spring Boot, Spring Data JPA, Spring WEB, Spring Security,
                                            Swagger 2, Flyway, Bean Validation, JWT, Lombook, ModelMapper, JDBC MySql, Maven.
                                        </p>
                                        <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>   
                    <Row form > 
                        <Col>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Card.Title><h3>Projeto</h3></Card.Title>
                                    <Card.Text>
                                        <p>Proposta do projeto; Pequeno sistema de agenda de clintes, com cadastro simplificado de usuário, onde cada usuário consiga ter acesso à apenas os seus
                                            clientes particulares. Entretanto com controle de perfil de usuario o administrador por sua vez consegue ter acesso
                                            a todos os clientes cadastradosde por todos os usuarios do sistema. Isso demostra que o backend consegue tratar os
                                            perfís separadamente e por sua vez devolvendo apenas os dados a quem pertence.
                                        </p>
                                    </Card.Text>

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

