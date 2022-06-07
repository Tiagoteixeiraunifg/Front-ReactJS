import React from 'react';
import { Container, Button, Col, Image, Row, Card, Carousel } from 'react-bootstrap';
import { carrouselTecnologias } from '../carrouselHome';


export const HomePrincipal = () => {

    return (

        <div className="auth-wrapper">
            <div className="auth-inner-cli">
                <Container className="mb-8">
                    <Row form>
                        <Col>
                            <h1> Olá seja bem vindo em nosso projeto!  </h1>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <br />
                            <Carousel fade className="carrousel">
                                {/*SPRING*/}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoSpringBoot.png"
                                        alt="Spring"
                                    />
                                    <Carousel.Caption>
                                        <p className='text-black'>O Spring é um framework open source para a plataforma Java criado por Rod Johnson</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                {/*JAVA */}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoJava.jpg"
                                        alt="Java"
                                    />
                                    <Carousel.Caption>
                                        <p className='text-black'>Java é uma linguagem de programação orientada a objetos desenvolvida na década de 90</p>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                {/*AWS AMPLIFY */}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoAwsAmplify.jpg"
                                        alt="AwsAmplify"
                                    />
                                    <Carousel.Caption>
                                        <p className='text-black'>O AWS Amplify é um conjunto de ferramentas e recursos especialmente
                                         desenvolvidos que permite que desenvolvedores frontend para plataformas móveis e Web</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                {/*AWS RDS */}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoAwsRDS.png"
                                        alt="Java"
                                    />
                                    <Carousel.Caption>
                                        <p className='text-black'>O Amazon Relational Database Service (RDS) é uma coleção de 
                                        serviços gerenciados que facilita a configuração, operação e escalabilidade de bancos de dados</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                {/*REACT JS*/}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoReact.png"
                                        alt="ReactJS"
                                    />
                                    <Carousel.Caption>
                                        <p className='text-black'>Uma biblioteca JavaScript para criar interfaces de usuário</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                {/*TYPESCRIPT */}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoTypescript.png"
                                        alt="Typescript"
                                    />

                                    <Carousel.Caption>
                                        <p className='text-black'>TypeScript é uma linguagem de programação fortemente tipada que se
                                            baseia em JavaScript.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                {/*Bootstrap*/}
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://images-sistema-a3.s3.amazonaws.com/logoBootstrap.png"
                                        alt="Bootstrap"
                                    />

                                    <Carousel.Caption>
                                        <p className='text-black'>Kit de ferramentas de front-end poderoso, extensível e repleto de recursos</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Card.Title><h4>Tecnologias</h4></Card.Title>
                                    <Card.Text>
                                        <p>Tecnologias utilizadas para o frontend; ReactJS, Typescript, Bootstrap, MaterialUI,
                                            Bootstrap Icons, FontAwesome Icons, React-Bootstrap.  </p>
                                        <br />
                                        <p>Tecnologias utilizadas para o backend; Java, Framwork Spring, Spring Boot, Spring MVC, Spring Data, Spring WEB, Spring Security,
                                            Swagger 2, Flyway, Bean Validation, JWT, Lombook, ModelMapper, JDBC MySql, Maven.
                                        </p>
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Card.Title><h4>Equipe e Projeto</h4></Card.Title>
                                    <Card.Text>
                                        <p>Equipe composta por Marco Alexandre e Tiago Teixeira</p>
                                        <br />
                                        <p>Propósito do projeto; demostrar as habilidades adquiridas até aqui. Proposta do projeto; Pequeno sistema
                                            de agenda de clintes, com cadastro simplificado de usuário, onde cada usuário consiga ter acesso à apenas os seus
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

