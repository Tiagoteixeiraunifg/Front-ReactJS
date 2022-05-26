import React from 'react';
import { Container, Button,  Col, Image, Row, Card } from 'react-bootstrap'


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

