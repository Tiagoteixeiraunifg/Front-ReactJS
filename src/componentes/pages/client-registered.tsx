
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button,Form, Spinner } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom'
import { IClient } from '../../interfaces';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setId,  setNome,  setSobrenome,  setEmail,  setCpf,  setCelular,
   setEndereco,  setNumero,  setComplemento, setCidade, setEstado, setCep, 
   setSalvo as setSalvoR,  setNovo as setNovoR, setEditando, setIdUser} from '../../redux/reducers/clientReducer'
import apiAuth from "../../services/Api";
import { AcceptMessage, ErrorMessage } from '../MainComponents';


export const TabelaCliente: React.FC = () => {
    
    
    /**
     * FUNCIONALIDADES REDUX 
     */
    const userLogin = useAppSelector(state => state.userLogin);
    const clientReducer = useAppSelector(state => state.clientReducer);
    const userStore = useDispatch();
    const navegarPara = useNavigate();

    
    /**
     * FLAGS DE FUNCIONALIDADE DO FORMULÁRIO
     */
    const [idClient, setIdClient] = useState<number>();
    const [index, setIndex] = useState("");
    const [error, setError] = useState("");
    const [listando, setListando] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editDel, setEditDel] = useState(false);


    /**
     * STATE COM A LISTA DE CLIENTES DO USUÁRIO LOGADO 
     */
    const [client, setCliente] = useState<IClient[]>([]);

    useEffect(() => {
       client.splice(0, client.length);  
       listarClient();
    }, [listando])




    /**
     * METODO GET AXIOS PARA CARREGAR LISTA DE CLIENTES
     */
    const listarClient = async () => {
        setLoading(true);
        await apiAuth.get('/v1/clientes', { headers: {'Content-Type': 'application/json', 'Accept': '*/*',
        'Authorization': `Bearer ${userLogin.token}`}})
        .then( (response) => {
            if(response.status === 200) {
                setCliente(response.data.data);
                setLoading(false);
                setListando(false);
            }else if(response.status === 201){
                setError('Usuário sem clientes cadastrados!');
                setLoading(false);
                setListando(false);
            }
           
        })
        .catch( (err) =>{

            setLoading(false);
                if(err.response.status === 401){
                    setError(err.response.status + ": Token expirado, acesso negado pelo servidor, faça login novamente!");                    
                }else if(err.response.status === 400){
                    
                }
        })

    }

    /**
     * ATUALIZAÇÃO DO REDUCER PARA EDIÇÃO DO CLIENTE SELECIONADO NA LISTA
     * @param cl 
     */
    const atualizaReducer = (cl: IClient) => {

        userStore(setEditando(true));
        userStore(setNovoR(false));
        userStore(setSalvoR(true));
        userStore(setId(cl.id));
        userStore(setIdUser(cl.user.id));
        userStore(setNome(cl.nome));  
        userStore(setSobrenome(cl.sobrenome));
        userStore(setCpf(cl.cpf));
        userStore(setCelular(cl.telefone));
        userStore(setEmail(cl.email));
        userStore(setEndereco(cl.end_rua));
        userStore(setComplemento(cl.end_complemento));
        userStore(setCidade(cl.end_cidade));
        userStore(setNumero(cl.end_numero));
        userStore(setEstado(cl.end_estado));
        userStore(setCep(cl.end_cep));

    }

    
    /**
     * FUNÇÃO DE CLICK NA LINHA DA TABELA
     * @param event 
     * @param valor 
     */
    const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, valor: number) => {
        const index = valor;
        const cliSelected = client[index];
        setIdClient(cliSelected.id);
        atualizaReducer(cliSelected);
        setEditDel(true);
        setIndex("Cliente selecionado: cod - " + cliSelected.id.toString() + " -" +cliSelected.nome + " " + cliSelected.sobrenome);
    }

    /**
     * METODO PARA RENDERIZAR A TABELA
     * @returns 
     */
    const listClientTable = () => {
       return (client.map((cli, index) => {
           const cl: IClient = cli;
           return (
            <tr key={index} onClick={(e) => { handleClick(e, index) }}>
            <td>{cl.id}</td>
            <td>{cl.nome}</td>
            <td>{cl.sobrenome}</td>
            <td>{cl.email}</td>
            <td>{cl.cpf}</td>
            <td>{cl.telefone}</td>
            <td>{cl.end_rua}</td>
            <td>{cl.end_complemento}</td>
        </tr>)
    }))}


    return (
        <div className="auth-wrapper">
            <div className="auth-inner-cli">
                <Container className="mb-8">
                    <Row>
                        <Col>
                            <Form>
                            <Row form>
                            <br/>
                                    <br />
                                    <h3>LISTAGEM DE CLIENTES CADASTRADOS</h3>
                                    <br />
                                    <br />
                                    { client &&
                                        <>
                                            <h5>Total de Clientes Cadastrados: {client.length}</h5>
                                        </>
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
                                    >

                                    <thead>
                                        <tr>{/*cabeçalho da tabela*/}
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
                                            {client.length > 0 && listClientTable()}
                                        </tbody>

                                    </Table>

                                    <Row>
                                        <Col>
                                            <Button
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
                                                Listar</Button>

                                            <Button
                                                className='m-2'
                                                variant="secondary"
                                                disabled={!editDel}
                                                onClick={() => {
                                                    if (editDel) {
                                                        navegarPara('/cad-cli')
                                                    }
                                                }}
                                            >
                                                Editar</Button>

                                            <Button
                                                className='m-2'
                                                variant="secondary"
                                                disabled={!editDel}
                                            > Excluir
                                            </Button>

                                            <Button
                                                className='m-2'
                                                variant="secondary"
                                                type="button"
                                                onClick={() =>
                                                    navegarPara('/cad-cli')}
                                            > Voltar
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