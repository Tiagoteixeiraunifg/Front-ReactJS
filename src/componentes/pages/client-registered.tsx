
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFloppyDisk, faUserPen, faTrashCan, faList, faRotate, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { IClient } from '../../interfaces';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
    setId, setNome, setSobrenome, setEmail, setCpf, setCelular,
    setEndereco, setNumero, setComplemento, setCidade, setEstado, setCep,
    setSalvo as setSalvoR, setNovo as setNovoR, setEditando, setIdUser, setNomeUser, setExcluir, setCancExcluir
} from '../../redux/reducers/clientReducer'
import apiAuth from "../../services/Api";
import { AcceptMessage, ErrorMessage } from '../MainComponents';
import { ModalConfirmDelClient } from '../modalCofirmDelClient';
import { Errors } from '../../types/Erros';

export const TabelaCliente: React.FC = () => {


    /**
     * FUNCIONALIDADES REDUX 
     */
    const userLogin = useAppSelector(state => state.userLogin);
    const clientReducer = useAppSelector(state => state.clientReducer);
    const storeClient = useDispatch();
    const navegarPara = useNavigate();


    /**
     * FLAGS DE FUNCIONALIDADE DO FORMULÁRIO
     */
    const [idClient, setIdClient] = useState<number>();
    const [index, setIndex] = useState("");
    const [countRows, setCountRows] = useState<number>(0);
    const [selectedRow, setSelectedRow] = useState<boolean>();
    const [error, setError] = useState("");
    const [falha, setFalha] = useState<boolean>(false);
    const [listando, setListando] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [editDel, setEditDel] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({
        timestamp: "",
        details: "",
    });

    /**
     * STATE COM A LISTA DE CLIENTES DO USUÁRIO LOGADO 
     */
    const [client, setCliente] = useState<IClient[]>([]);

    useEffect(() => {
        client.splice(0, client.length);
        listarClient();
    }, [listando])

    useEffect(() => {
        if (del && clientReducer.excluir) {
            delClient(clientReducer.id);
            setDel(false);
            clearReducerClient();
            setListando(true);
        }
    }, [clientReducer.excluir])

    /**
 * Effect que controla a ação de cancelar no modal
 */
    useEffect(() => {
        if (del) {
            if (clientReducer.cancExcluir) {
                setDel(false);
                storeClient(setCancExcluir(false));
            }
        }
    }, [clientReducer.cancExcluir])

    /**
     * METODO GET AXIOS PARA CARREGAR LISTA DE CLIENTES
     */
    const listarClient = async () => {
        setLoading(true);
        await apiAuth.get('/v1/clientes', {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*/*',
                'Authorization': `Bearer ${userLogin.token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setCliente(response.data.data);
                    setLoading(false);
                    setListando(false);
                    setFalha(false);
                } else if (response.status === 201) {
                    setError('Usuário sem clientes cadastrados!');
                    setFalha(false);
                    setLoading(false);
                    setListando(false);
                }

            })
            .catch((err) => {

                setLoading(false);
                if (err.response.status === 401) {
                    setError(err.response.status + ": Token expirado, acesso negado pelo servidor, faça login novamente!");
                } else if (err.response.status === 400) {
                    setFalha(true);
                    setErrors(err.response.data.errors);
                }
            })

    }


    /**
     * ATUALIZAÇÃO DO REDUCER PARA EDIÇÃO DO CLIENTE SELECIONADO NA LISTA
     * @param cl 
     */
    const atualizaReducer = (cl: IClient) => {

        storeClient(setEditando(true));
        storeClient(setNovoR(false));
        storeClient(setSalvoR(true));
        storeClient(setExcluir(false));
        storeClient(setCancExcluir(false));
        storeClient(setId(cl.id));
        storeClient(setIdUser(cl.user.id));
        storeClient(setNomeUser(cl.user.nome));
        storeClient(setNome(cl.nome));
        storeClient(setSobrenome(cl.sobrenome));
        storeClient(setCpf(cl.cpf));
        storeClient(setCelular(cl.telefone));
        storeClient(setEmail(cl.email));
        storeClient(setEndereco(cl.end_rua));
        storeClient(setComplemento(cl.end_complemento));
        storeClient(setCidade(cl.end_cidade));
        storeClient(setNumero(cl.end_numero));
        storeClient(setEstado(cl.end_estado));
        storeClient(setCep(cl.end_cep));

    }

    /**
     * FUNÇÃO PARA RESETAR AO ESTADO INICIAL O REDUCER
     */
    const clearReducerClient = () => {

        storeClient(setEditando(false));
        storeClient(setNovoR(false));
        storeClient(setSalvoR(false));
        storeClient(setExcluir(false));
        storeClient(setId(0));
        storeClient(setIdUser(0));
        storeClient(setNomeUser(""));
        storeClient(setNome(""));
        storeClient(setSobrenome(""));
        storeClient(setCpf(""));
        storeClient(setCelular(""));
        storeClient(setEmail(""));
        storeClient(setEndereco(""));
        storeClient(setComplemento(""));
        storeClient(setCidade(""));
        storeClient(setNumero(""));
        storeClient(setEstado(""));
        storeClient(setCep(""));
    }

    /**
     * FUNÇÃO PARA DELETAR O CLIENTE A PARTIR DO ID
     * @param idClient 
     */
    const delClient = async (idClient: number) => {

        await apiAuth.delete('/v1/clientes/' + idClient, {
            headers: {
                'Content-Type': 'application/json', 'Accept': '*/*',
                'Authorization': `Bearer ${userLogin.token}`
            }
        })
            .then((response) => {
                if (response.status == 204) {
                    setFalha(false);
                    setDel(false);
                    setIndex('Cliente Deletado!');
                }
            }).catch((err) => {
                if (err.response.status === 401) {
                    setError(err.response.status + ": Token expirado, acesso negado pelo servidor, faça login novamente!");
                    setDel(false);
                } else if (err.response.status === 400) {
                    setFalha(true);
                    setDel(false);
                    setErrors(err.response.data.errors);
                }
            })

    }


    const handleCheck = (event: React.MouseEvent<unknown>, valor: number) => {
        const index = valor;
        const cliSelected = client[index];
        setIdClient(cliSelected.id);
        atualizaReducer(cliSelected);
        setEditDel(true);
        setIndex("Cliente selecionado: cod - " + cliSelected.id.toString() + " - " + cliSelected.nome + " " + cliSelected.sobrenome);
    }

    const handleAuxButtons = (event: React.MouseEvent<unknown>, valor: number) => {
        const index = valor;
        const cliSelected = client[index];
        setIdClient(cliSelected.id);
        atualizaReducer(cliSelected);
        setEditDel(true);
        setIndex("Cliente selecionado: cod - " + cliSelected.id.toString() + " - " + cliSelected.nome + " " + cliSelected.sobrenome);
    }

    /**
     * FUNÇÃO QUE MUDA O STATE RESPONSAVEL POR LIBERAR O MODAL DE CONFIRMAÇÃO
     */
    const handleClickDel = () => {
        setDel(true);
    }


    /**
     * METODO PARA RENDERIZAR A TABELA
     * @returns 
     */
    const listClientTable = () => {
        return (client.map((cli, index) => {
            const cl: IClient = cli;
            return (
                <tr key={index} onClick={(e) => { handleCheck(e, index) }}>
                    <td>
                        <Button
                            key={index}
                            type='button'
                            variant="secondary"
                            onClick={(e) => { handleAuxButtons(e, index); navegarPara('/cad-cli') }}
                        >
                            <FontAwesomeIcon className='fa-sm me-2' icon={faUserPen} />
                        </Button>
                    </td>
                    <td>
                        <Button
                            key={index}
                            type='button'
                            variant="danger"
                            onClick={(e) => { handleAuxButtons(e, index); handleClickDel(); }}
                        >
                            <FontAwesomeIcon className='fa-sm me-2' icon={faTrashCan} />
                        </Button>
                    </td>
                    <td>{cl.id}</td>
                    <td>{cl.user.nome}</td>
                    <td>{cl.nome}</td>
                    <td>{cl.sobrenome}</td>
                    <td>{cl.email}</td>
                    <td>{cl.cpf}</td>
                    <td>{cl.telefone}</td>
                    <td>{cl.end_rua}</td>
                    <td>{cl.end_complemento}</td>

                </tr>)
        }))
    }


    return (
        <div className="auth-wrapper">
            <div className="auth-inner-cli">
                <Container className="mb-8">
                    <Row>
                        <Col>
                            <Form>
                                <Row form>
                                    {del &&
                                        <ModalConfirmDelClient />
                                    }

                                    <br />
                                    <br />
                                    <h3>LISTAGEM DE CLIENTES CADASTRADOS</h3>
                                    <br />
                                    <br />
                                    {client &&
                                        <>
                                            <h5>Total de Clientes Cadastrados: {client.length}</h5>
                                        </>
                                    }
                                    {errors && falha &&
                                        <ErrorMessage>{errors.details}</ErrorMessage>
                                    }
                                    {error &&
                                        <ErrorMessage>{error}</ErrorMessage>
                                    }
                                    {
                                        index &&
                                        <AcceptMessage>{index}</AcceptMessage>
                                    }

                                    <Table
                                        responsive
                                        bordered
                                        hover
                                        striped
                                    >

                                        <thead>
                                            <tr>{/*cabeçalho da tabela*/}
                                                <th></th>
                                                <th></th>
                                                <th>Código</th>
                                                <th>Usuário Cad.</th>
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
                                            {client.length > 0 && listClientTable()}
                                        </tbody>

                                    </Table>

                                    <Row>
                                        <Col>
                                            <Button
                                                type='button'
                                                className='m-2'
                                                variant="secondary"
                                                onClick={() => { listarClient(), setListando(true) }}
                                            >
                                                {loading &&
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                }
                                                <FontAwesomeIcon className='fa-xl me-2' icon={faRotate} />
                                                Listar
                                            </Button>

                                            <Button
                                                type='button'
                                                className='m-2'
                                                variant="secondary"
                                                disabled={!editDel}
                                                onClick={() => {
                                                    if (editDel) {
                                                        navegarPara('/cad-cli')
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon className='fa-xl me-2' icon={faUserPen} />
                                                Editar
                                            </Button>

                                            <Button
                                                className='m-2'
                                                type='button'
                                                variant="danger"
                                                disabled={!editDel}
                                                onClick={() => handleClickDel()}
                                            >
                                                <FontAwesomeIcon className='fa-xl me-2' icon={faTrashCan} />
                                                Excluir
                                            </Button>

                                            <Button
                                                className='m-2'
                                                variant="secondary"
                                                type="button"
                                                onClick={() => { navegarPara('/cad-cli'); clearReducerClient(); }}
                                            >
                                                <FontAwesomeIcon className='fa-xl me-2' icon={faLeftLong} />
                                                Voltar
                                            </Button>
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