
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faTrashCan, faList, faRotate, faLeftLong } from '@fortawesome/free-solid-svg-icons';
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

    useEffect(() => {
        if (!listando) {
            listarClient();
        }
    }, [listando])

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
            .then((response: { status: number; data: { data: React.SetStateAction<IClient[]>; }; }) => {
                if (response.status == 200) {
                    setCliente(response.data.data);
                    setLoading(false);
                    setListando(false);
                    setFalha(false);
                } else if (response.status == 201) {
                    setError('Usuário sem clientes cadastrados!');
                    setFalha(false);
                    setLoading(false);
                    setListando(false);
                }

            })
            .catch((error: { response: { status: string | number; data: { errors: React.SetStateAction<Errors>; }; }; }) => {

                setLoading(false);
                if (error.response.status == 401) {
                    setError(error.response.status + ": Token expirado, acesso negado pelo servidor, faça login novamente!");
                } else if (error.response.status == 400) {
                    setFalha(true);
                    setErrors(error.response.data.errors);
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
        storeClient(setNomeUser(cl.user.nome.toUpperCase()));
        storeClient(setNome(cl.nome.toUpperCase()));
        storeClient(setSobrenome(cl.sobrenome.toUpperCase()));
        storeClient(setCpf(cl.cpf));
        storeClient(setCelular(cl.telefone));
        storeClient(setEmail(cl.email.toUpperCase()));
        storeClient(setEndereco(cl.end_rua.toUpperCase()));
        storeClient(setComplemento(cl.end_complemento.toUpperCase()));
        storeClient(setCidade(cl.end_cidade.toUpperCase()));
        storeClient(setNumero(cl.end_numero.toUpperCase()));
        storeClient(setEstado(cl.end_estado.toUpperCase()));
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
            .then((response: { status: number; }) => {
                if (response.status == 204) {
                    setFalha(false);
                    setDel(false);
                    setIndex('Cliente Deletado!');
                }
            }).catch((err: { response: { status: string | number; data: { errors: React.SetStateAction<Errors>; }; }; }) => {
                if (err.response.status == 401) {
                    setError(err.response.status + ": Token expirado, acesso negado pelo servidor, faça login novamente!");
                    setDel(false);
                } else if (err.response.status == 400) {
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
                <tr className='mt-1' key={index} onClick={(e) => { handleCheck(e, index) }}>
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
                    <td>{cl.user.nome.toUpperCase()}</td>
                    <td>{cl.nome.toUpperCase()}</td>
                    <td>{cl.sobrenome.toUpperCase()}</td>
                    <td>{cl.email.toUpperCase()}</td>
                    <td>{cl.cpf}</td>
                    <td>{cl.telefone}</td>
                    <td>{cl.end_rua.toUpperCase()}</td>
                    <td>{cl.end_complemento.toUpperCase()}</td>

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
                                    <h3 className="mb-3 mt-3">LISTAGEM DE CLIENTES CADASTRADOS</h3>
                                    {client  &&
                                        <>
                                            <h5 className="mb-2 mt-1">Total de Clientes Cadastrados: {client.length}</h5>
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

                                    <Table responsive  bordered  hover  className="mt-3"
                                    >
                                        <thead>{/*cabeçalho da tabela*/}
                                            <tr>
                                                <th>Editar</th>
                                                <th>Excluir</th>
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
                                            {/* Botao Listar */}
                                            <Button 
                                                type='button'
                                                className='m-2'
                                                variant="secondary"
                                                onClick={() => { if(!listando) {setListando(true)}  }}
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
                                            {/* Botao Editar */}        
                                            <Button
                                                type='button'
                                                className='m-2'
                                                variant="secondary"
                                                disabled={!editDel}
                                                onClick={() => {if (editDel) {navegarPara('/cad-cli')
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon className='fa-xl me-2' icon={faUserPen} />
                                                Editar
                                            </Button>
                                            {/* Botao Excluir */}       
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
                                              {/* Botao Voltar */}
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