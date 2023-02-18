import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Stack, Spinner, } from 'react-bootstrap';
import ComboBox from '../comboBox/comboBox';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFloppyDisk, faUserPen, faTrashCan, faList } from '@fortawesome/free-solid-svg-icons';
import {  setId, setNome, setSobrenome, setEmail, setCpf, setCelular,
  setEndereco, setNumero, setComplemento, setCidade, setEstado, setCep,
  setSalvo as setSalvoR, setNovo as setNovoR, setEditando as setEditandoR, setExcluir as setExcluirR, setIdUser, setCancExcluir
} from '../../redux/reducers/clientReducer'
import apiAuth from "../../services/Api";
import { IClient } from '../../interfaces';
import { ErrorMessage, AcceptMessage } from '../MainComponents';
import { Errors } from "../../types/Erros";
import { ModalConfirmDelClient } from "../modalCofirmDelClient";



export const PageCliente = () => {

  /**
   * trabalho com os Reduces do formulário
   */

  const userLogin = useAppSelector(state => state.userLogin);
  const clientReducer = useAppSelector(state => state.clientReducer);
  const storeClient = useDispatch();

  /**
   * flags de ação do Formulário
   */
  const [loading, setLoading] = useState(false);
  const [falha, setFalha] = useState(false);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [salvo, setSalvo] = useState<boolean>(false);
  const [novo, setNovo] = useState<boolean>(true);
  const [editando, setEditando] = useState<boolean>(false);
  const [gravar, setGravar] = useState<boolean>(false);
  const [excluir, setExcluir] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [loadingexcluir, setLoadingExcluir] = useState<boolean>(false);


  /**
   * redirecionador do ReactRouterDOM
   */
  const navegarPara = useNavigate();

  //const [clientList, setClienteList] = useState<IClient[]>([]);

  const [errors, setErrors] = useState<Errors>({
    timestamp: "",
    details: "",
  });

  const [client, setCliente] = useState<IClient>({
    id: 0,
    user: { id: userLogin.id, nome: "" },
    nome: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    end_rua: "",
    end_complemento: "",
    end_cidade: "",
    end_numero: "",
    end_estado: "",
    end_cep: "",
  });

  /**
   * Função para iniciar o State com valores padrões
   */
  const clearStateClient = () => {
    if (novo) {
      setCliente(
        {
          id: 0,
          user: { id: userLogin.id, nome: "" },
          nome: "",
          sobrenome: "",
          cpf: "",
          telefone: "",
          email: "",
          end_rua: "",
          end_complemento: "",
          end_cidade: "",
          end_numero: "",
          end_estado: "",
          end_cep: "",
        }
      )
    }
  }

  /**
   * Função para carregar o State com valores do Reducer
   */
  const upEditStateClient = () => {
    if (clientReducer.editando) {
      setCliente(
        {
          id: clientReducer.id,
          user: { id: clientReducer.user.id, nome: clientReducer.user.nome.toUpperCase() },
          nome: clientReducer.nome.toUpperCase(),
          sobrenome: clientReducer.sobrenome.toUpperCase(),
          cpf: clientReducer.cpf,
          telefone: clientReducer.telefone,
          email: clientReducer.email.toUpperCase(),
          end_rua: clientReducer.end_rua.toUpperCase(),
          end_complemento: clientReducer.end_complemento.toUpperCase(),
          end_cidade: clientReducer.end_cidade.toUpperCase(),
          end_numero: clientReducer.end_numero.toUpperCase(),
          end_estado: clientReducer.end_estado.toUpperCase(),
          end_cep: clientReducer.end_cep,
        }
      )
    }
  }

  /**
   * Effect que controla o estado do formulario ao salvar ou editar o cliente
   */
  useEffect(() => {
    if (client.id > 0 && clientReducer.novo) {

      setSalvo(true);
      setNovo(true);
      atualizaReducer();
      setHabilitado(true);
      setSucess("Cliente salvo com sucesso!");

    } else if (salvo) {

      if (client.id > 0) {
        setSalvo(true);
        setNovo(true);
        atualizaReducer();
        setHabilitado(true);
        setSucess("Cliente atualizado com sucesso!");
      }
    }
  }, [client])

  /**
   * Effect que controla o estado do formulario quando esta em edição do cliente
   */
  useEffect(() => {

    if (clientReducer.editando) {
      upEditStateClient();
      setHabilitado(false);
      setNovo(false);
      setEditando(true);
      setGravar(true);
      setExcluir(true);
    } else {
      clearStateClient();
    }
  }, [clientReducer.editando])

  /**
   * Effect que controla a ação de cancelar no modal
   */
  useEffect(() => {
    if(del){
      if(clientReducer.cancExcluir){
        setDel(false);
        storeClient(setCancExcluir(false));
      }
    }
  },[clientReducer.cancExcluir])

  /**
   * Effect  que conclui a exclusão do cliente
   */
  useEffect(() => {
    if(clientReducer.excluir){
        setHabilitado(true);
        setNovo(true);
        delClient(clientReducer.id);
        clearReducerClient();
        setEditando(false);
        setExcluir(false);
        setGravar(false);
    }
  },[clientReducer.excluir])


  /**
   * Função para atualizar o Reducer com o cliente recem cadastrado
   */
  const atualizaReducer = () => {

    storeClient(setNovoR(novo));
    storeClient(setSalvoR(salvo));
    storeClient(setId(client.id));
    storeClient(setNome(client.nome.toUpperCase()));
    storeClient(setSobrenome(client.sobrenome.toUpperCase()));
    storeClient(setCpf(client.cpf));
    storeClient(setCelular(client.telefone));
    storeClient(setEmail(client.email.toUpperCase()));
    storeClient(setEndereco(client.end_rua.toUpperCase()));
    storeClient(setComplemento(client.end_complemento.toUpperCase()));
    storeClient(setCidade(client.end_cidade.toUpperCase()));
    storeClient(setNumero(client.end_numero.toUpperCase()));
    storeClient(setEstado(client.end_estado.toUpperCase()));
    storeClient(setCep(client.end_cep));

  }

  /**
  * FUNÇÃO PARA RESETAR AO ESTADO INICIAL O REDUCER
  */
  const clearReducerClient = () => {
        
        storeClient(setEditandoR(false));
        storeClient(setNovoR(false));
        storeClient(setSalvoR(false));
        storeClient(setExcluirR(false));
        storeClient(setId(0));
        storeClient(setIdUser(0));
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
   * Função para atualizar o State do Cliente
   * @param event 
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({
      ...client,
      [event.target.name]: event.target.value,
    })
  }

  /**
   * Função para atualizar o State cliente com a informação do componente Select com Reducer
   * @returns 
   */

  function upState() {
    if (userLogin.userperfil === "ADMIN" && editando) {
      client.user.id = clientReducer.user.id
    }
    if (clientReducer.selectedEstado) {
      client.end_estado = clientReducer.end_estado
      return true;
    } else if (!clientReducer.selectedEstado) {
      setError("Por favor selecione o estado do cliente");
      return false;
    }
  }

  /**
   * Posta novo cliente para o usuário logado no sistema.
   */
  const post = async () => {
    setLoading(true);
    apiAuth.post('/v1/clientes', client, {
      headers: {
        'Content-Type': 'application/json', 'Accept': '*/*',
        'Authorization': `Bearer ${userLogin.token}`
      }
    })
      .then(function (response) {
        setCliente(response.data.data);
        setFalha(false);
        setLoading(false);
        setEditando(true);
        setSalvo(true);
        setExcluir(true);
        setError("");
      }).catch(function (err) {
        if (err) {
          setLoading(false);
          if (err.response.status === 401) {
            setError(err.response.status + ": Token expirado, acesso negado pelo servidor, faça login novamente!");
          } else if (err.response.status === 400) {
            setErrors(err.response.data.errors);
            setFalha(true);
          }
        }
      })
  }

  /**
   * Função para atualização do Cliente
   * @param idClient 
   */
  const put = async (idClient: number) => {
    setLoading(true);
    apiAuth.put('/v1/clientes/' + idClient, client, {
      headers: {
        'Content-Type': 'application/json', 'Accept': '*/*',
        'Authorization': `Bearer ${userLogin.token}`
      }
    })
      .then(function (response) {
        setCliente(response.data.data);
        setFalha(false);
        setLoading(false);
        setEditando(true);
        setSalvo(true);
        setNovo(true);
        setGravar(false);
        setExcluir(true);
        setError("");
      }).catch(function (err) {
        if (err) {
          setLoading(false);
          if (err.response.status === 401) {
            setError(err.response.status + ": Token expirado, acesso negado pelo servidor, faça login novamente!");
          } else if (err.response.status === 400) {
            setErrors(err.response.data.errors);
            setFalha(true);
          }
        }
      })
  }


 /**
 * FUNÇÃO PARA DELETAR O CLIENTE A PARTIR DO ID
 * @param idClient 
 */
  const delClient = async (idClient: number) => {
    setLoadingExcluir(true);
    await apiAuth.delete('/v1/clientes/' + idClient, {
      headers: {
        'Content-Type': 'application/json', 'Accept': '*/*',
        'Authorization': `Bearer ${userLogin.token}`
      }
    })
      .then((response) => {
        setLoadingExcluir(false);
        if (response.status == 204) {
          setSucess('Cliente Deletado!');
          setSalvo(true);
          setFalha(false);
          setDel(false);
        }
      }).catch((err) => {
        setLoadingExcluir(false);
        if (err.response.status === 401) {
          setError(err.response.status + ": Token expirado, acesso negado pelo servidor, faça login novamente!");
        } else if (err.response.status === 400) {
          setFalha(true);
          setErrors(err.response.data.errors);
        }
      })

  }

  const saveClient = () => {
    if (upState() && clientReducer.novo) {
      post();
    } else if (upState() && clientReducer.editando) {
      put(clientReducer.id);
    }
  }


  return (
    <div className="auth-wrapper">
      <div className="auth-inner-cli">
        <Container className="mb-8">
          <Row>
            <Col>
              <Form>
                <Stack >
                  {del &&
                    <ModalConfirmDelClient />
                  }
                  <br />
                  <h3> CADASTRO DE CLIENTES </h3>
                  <br />
                  {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                  }
                  {errors && falha &&
                    <ErrorMessage>{errors.details}</ErrorMessage>
                  }
                  {salvo &&
                    <AcceptMessage>{sucess}</AcceptMessage>
                  }
                  <br />

                </Stack>
                <Row form>
                  {/* Nome */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feFirstName">Nome</label>
                    <Form.Control
                      id="feFirstName"
                      placeholder="Primeiro nome"
                      name="nome"
                      value={client.nome.toUpperCase()}
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                  {/* Sobre Nome */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feLastName">Sobrenome</label>
                    <Form.Control
                      id="feLastName"
                      placeholder="Segundo nome"
                      value={client.sobrenome.toUpperCase()}
                      name="sobrenome"
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* CPF */}
                  <Col md="3" className="form-group">
                    <label htmlFor="feCpf">CPF</label>
                    <Form.Control
                      id="feCpf"
                      placeholder="000.000.000-00"
                      name="cpf"
                      value={client.cpf}
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                  {/* Celular */}
                  <Col md="3" className="form-group">
                    <label htmlFor="feCelPhone">Celular</label>
                    <Form.Control
                      id="feCelPhone"
                      placeholder="(00)00000-0000"
                      name="telefone"
                      value={client.telefone}
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <Form.Control
                      name="email"
                      value={client.email.toUpperCase()}
                      type="email"
                      id="feEmail"
                      placeholder="exemplo@exemplo.com"
                      onChange={handleChange}
                      autoComplete="email"
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Endereço */}
                  <Col md="8" className="form-group">
                    <label htmlFor="feEndereco">Endereço</label>
                    <Form.Control
                      name="end_rua"
                      value={client.end_rua.toUpperCase()}
                      type="text"
                      id="feEndereco"
                      placeholder="Endereço Rua, Av, Travessa"
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                  {/* Numero */}
                  <Col md="4" className="form-group">
                    <label htmlFor="feNumber">Número</label>
                    <Form.Control
                      id="feNumber"
                      type="text"
                      placeholder="Nº 123456"
                      name='end_numero'
                      value={client.end_numero.toUpperCase()}
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                </Row>
                {/* Complemento */}
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="feComplemento">Complemento</label>
                    <Form.Control
                      name="end_complemento"
                      value={client.end_complemento.toUpperCase()}
                      type="text"
                      id="feComplemento"
                      placeholder="Complemento do Endereço"
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Cidade */}
                  <Col md="4" className="form-group">
                    <label htmlFor="feCity">Cidade</label>
                    <Form.Control
                      id="feCity"
                      name="end_cidade"
                      value={client.end_cidade.toUpperCase()}
                      placeholder="Cidade"
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                  {/* Estado */}
                  <Col md="4" className="form-group">
                    <label htmlFor="feInputState">Estado</label>
                    <ComboBox id="feInputState" disabled={habilitado} />
                  </Col>
                  {/* CEP */}
                  <Col md="4" className="form-group">
                    <label htmlFor="feZipCode">CEP</label>
                    <Form.Control
                      id="feZipCode"
                      name="end_cep"
                      value={client.end_cep}
                      placeholder="CEP"
                      onChange={handleChange}
                      className="textbox"
                      disabled={habilitado}
                    />
                  </Col>
                </Row>
                <br />
                <br />
                <Row>
                  <Col>
                    <Button
                      className='m-1'
                      variant="primary"
                      type="button"
                      disabled={!novo}
                      onClick={() => {
                        clearStateClient();
                        setHabilitado(false);
                        storeClient(setNovoR(true));
                        setNovo(false);
                        setEditando(false);
                        setGravar(true);
                        setSalvo(false);
                        setExcluir(false);
                      }} >
                    <FontAwesomeIcon className='fa-xl me-2' icon={faPlus} />    
                      Novo
                    </Button>

                    <Button
                      className='m-1'  
                      variant="secondary"
                      type="button"
                      disabled={!editando}
                      onClick={() => {
                        setHabilitado(false);
                        storeClient(setNovoR(false));
                        storeClient(setEditandoR(true));
                        setNovo(false);
                        setSalvo(false);
                        clearStateClient();
                      }} >
                      <FontAwesomeIcon className='fa-xl me-2' icon={faUserPen} />  
                      Editar
                    </Button>

                    <Button
                      className='m-1'
                      variant="success"
                      type="button"
                      onClick={saveClient}
                      disabled={!gravar}>
                      <FontAwesomeIcon className='fa-xl me-2' icon={faFloppyDisk} />
                      {loading &&
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      }
                      Gravar
                    </Button>

                    <Button
                      className='m-1'
                      variant="danger"
                      type="button"
                      onClick={() => {setDel(true);}}
                      disabled={!excluir}>
                      <FontAwesomeIcon className='fa-xl me-2' icon={faTrashCan} />
                      {loadingexcluir &&
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      }
                      Excluir
                    </Button>

                    <Button
                      className='m-1'
                      variant="secondary"
                      type="button"
                      onClick={() =>
                        navegarPara('/cli-reg')
                      }
                    >
                      <FontAwesomeIcon className='fa-xl me-2' icon={faList} />
                      Listar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )

};


