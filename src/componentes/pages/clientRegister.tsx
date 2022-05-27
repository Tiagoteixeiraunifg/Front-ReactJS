import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Stack, Spinner, } from 'react-bootstrap';
import ComboBox from '../comboBox/comboBox';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
  setId, setNome, setSobrenome, setEmail, setCpf, setCelular,
  setEndereco, setNumero, setComplemento, setCidade, setEstado, setCep,
  setSalvo as setSalvoR, setNovo as setNovoR, setEditando as setEditandoR
} from '../../redux/reducers/clientReducer'
import apiAuth from "../../services/Api";
import { IClient } from '../../interfaces';
import { ErrorMessage, AcceptMessage } from '../MainComponents';
import { Errors } from "../../types/Erros";



export const PageCliente = () => {

  /**
   * trabalho com os Reduces do formulário
   */

  const userLogin = useAppSelector(state => state.userLogin);
  const clientReducer = useAppSelector(state => state.clientReducer);
  const userStore = useDispatch();

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
          user: { id: clientReducer.user.id, nome: clientReducer.user.nome },
          nome: clientReducer.nome,
          sobrenome: clientReducer.sobrenome,
          cpf: clientReducer.cpf,
          telefone: clientReducer.telefone,
          email: clientReducer.email,
          end_rua: clientReducer.end_rua,
          end_complemento: clientReducer.end_complemento,
          end_cidade: clientReducer.end_cidade,
          end_numero: clientReducer.end_numero,
          end_estado: clientReducer.end_estado,
          end_cep: clientReducer.end_cep,
        }
      )
    }
  }


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
   * Função para atualizar o Reducer com o cliente recem cadastrado
   */

  const atualizaReducer = () => {

    userStore(setNovoR(novo));
    userStore(setSalvoR(salvo));
    userStore(setId(client.id));
    userStore(setNome(client.nome));
    userStore(setSobrenome(client.sobrenome));
    userStore(setCpf(client.cpf));
    userStore(setCelular(client.telefone));
    userStore(setEmail(client.email));
    userStore(setEndereco(client.end_rua));
    userStore(setComplemento(client.end_complemento));
    userStore(setCidade(client.end_cidade));
    userStore(setNumero(client.end_numero));
    userStore(setEstado(client.end_estado));
    userStore(setCep(client.end_cep));

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
                      value={client.nome}
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
                      value={client.sobrenome}
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
                      value={client.email}
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
                      value={client.end_rua}
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
                      value={client.end_numero}
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
                      value={client.end_complemento}
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
                      value={client.end_cidade}
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
                      variant="secondary"
                      type="button"
                      disabled={!novo}
                      onClick={() => {
                        clearStateClient();
                        setHabilitado(false);
                        userStore(setNovoR(true));
                        setNovo(false);
                        setEditando(false);
                        setGravar(true);
                        setSalvo(false);
                        setExcluir(false);
                      }} >

                      Novo
                    </Button>

                    <Button
                      className='m-1'  
                      variant="secondary"
                      type="button"
                      disabled={!editando}
                      onClick={() => {
                        setHabilitado(false);
                        userStore(setNovoR(false));
                        userStore(setEditandoR(true));
                        setNovo(false);
                        setSalvo(false);
                        clearStateClient();
                      }} >

                      Editar
                    </Button>

                    <Button
                      className='m-1'
                      variant="secondary"
                      type="button"
                      onClick={saveClient}
                      disabled={!gravar}>
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
                      variant="secondary"
                      type="button"
                      onClick={() => { }}
                      disabled={!excluir}>
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


