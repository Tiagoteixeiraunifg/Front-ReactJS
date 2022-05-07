
import React, { useState } from 'react';
import { Container, Row, Col, Table, Button,Form } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom'



export const TabelaCliente = () => {

    const navegarPara = useNavigate();
    const [index, setIndex] = useState<string>("");



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
                                <Table
                                 responsive 
                                 bordered 
                                 hover
                                 >
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

                                        </tr>
                                    </tbody>
                                    </Table>
                                    <Row>
                                        <Col>
                                            <Button className='me-2' variant="secondary">Editar</Button>
                                            <Button className='me-2' variant="secondary">Excluir</Button>
                                            <Button className='me-2' variant="secondary" type="button" onClick={() => navegarPara('/')}> Voltar </Button>
                                        </Col>
                                    </Row>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );

}