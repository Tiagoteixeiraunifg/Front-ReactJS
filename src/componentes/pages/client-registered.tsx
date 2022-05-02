
import React from 'react';
import { Container, Row, Col, Table, ButtonGroup, Button,Form } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom'



export const TabelaCliente = () => {

    const navegarPara = useNavigate();


    return (
        <div className="auth-wrapper">
            <div className="auth-inner-cli">
                <Container className="mb-8">
                    <Row>
                        <Col>
                            <Form>
                            <Row form>
                            <br/>
                            <br/>
                                <h3>LISTAGEM DE CLIENTES CADASTRADOS</h3>
                                <br/>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nome</th>
                                            <th>Sobrenome</th>
                                            <th>Email</th>
                                            <th>CPF</th>
                                            <th>Telefone</th>
                                            <th>Endereço</th>
                                            <th>Complemento</th>
                                            <th>Editar</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td> <Button variant="secondary">Editar</Button> </td>
                                            <td> <Button variant="secondary">Excluir</Button> </td>

                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td> <Button variant="secondary">Editar</Button> </td>
                                            <td> <Button variant="secondary">Excluir</Button> </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Larry the Bird</td>
                                            <td>@twitter</td>
                                            <td>@fat</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td> <Button variant="secondary">Editar</Button> </td>
                                            <td> <Button variant="secondary">Excluir</Button> </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div className="row">
                                    <ButtonGroup>
                                        <Button variant="secondary" type="button" onClick={()=> navegarPara('/')}> Voltar </Button>
                                    </ButtonGroup>
                                </div>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );

}